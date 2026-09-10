// TODO: replace mock operations with authenticated API requests to /api/roles.
import type { Role } from '@/types';
import { getDB, getActor, delay, clone, newId, transaction, auditEvent } from './store';
import { access, requireRecord } from './access';
function editable(){if(access('roles','manage').scope!=='all')throw new Error('Access denied. Organisation-wide role management is required.');}
export const RoleService={
 async list(query:{search?:string}={}){await delay();access('roles');return clone(getDB().roles.filter(r=>!r.deletedAt&&(!query.search||r.name.toLowerCase().includes(query.search.toLowerCase()))));},
 async getById(id:string){const list=await this.list();return requireRecord(list.find(r=>r.id===id&&!r.deletedAt),'Role');},
 async save(input:Omit<Role,'id'|'isSystem'>,id?:string){await delay();editable();if(!input.name.trim())throw new Error('Role name is required.');if(getDB().roles.some(r=>!r.deletedAt&&r.id!==id&&r.name.toLowerCase()===input.name.toLowerCase()))throw new Error('A role with this name already exists.');return clone(transaction(()=>{let role=id?requireRecord(getDB().roles.find(r=>r.id===id&&!r.deletedAt),'Role'):undefined;if(role?.id==='admin')throw new Error('The administrator role keeps all permissions.');if(role)Object.assign(role,input);else{role={...input,id:newId('ROLE'),isSystem:false};getDB().roles.push(role);}auditEvent('Role updated','Role',role.id,{name:role.name});return role;}));},
 async delete(id:string){await delay();editable();const r=requireRecord(getDB().roles.find(r=>r.id===id&&!r.deletedAt),'Role');if(r.isSystem)throw new Error('System roles cannot be deleted.');if(getDB().employees.some(e=>e.role===id&&!e.deletedAt))throw new Error('Reassign all members before deleting this role.');transaction(()=>{auditEvent('Role deleted','Role',id,{name:r.name});r.deletedAt=new Date().toISOString();});},
 async assign(roleId:string,employeeId:string){await delay();editable();const role=requireRecord(getDB().roles.find(r=>r.id===roleId&&!r.deletedAt),'Role'),e=requireRecord(getDB().employees.find(e=>e.id===employeeId&&!e.deletedAt),'Employee');if(e.id===getActor().id&&roleId!=='admin')throw new Error('You cannot revoke your own administrative access.');transaction(()=>{e.role=role.id;auditEvent('Role assigned','Employee',e.id,{name:e.name,role:role.name});});},
 async revoke(roleId:string,employeeId:string){await delay();editable();const e=requireRecord(getDB().employees.find(e=>e.id===employeeId&&!e.deletedAt),'Employee');if(e.role!==roleId)throw new Error('The role assignment changed. Refresh and try again.');if(e.id===getActor().id)throw new Error('You cannot revoke your own role.');transaction(()=>{e.role='employee';auditEvent('Role revoked','Employee',e.id,{name:e.name,previousRole:roleId});});},
};

