// TODO: replace mock operations with authenticated API requests to /api/organisation/units.
import type { UnitInput } from '@/types';
import { getDB, delay, clone, newId, transaction, auditEvent } from './store';
import { access, requireRecord } from './access';
import { descendantIds, unitPath } from '@/utils/buildTree';
import { inScope } from '@/utils/permissions';
export function countedUnits(){const {db,user,scope}=access('organisation');return db.units.filter(u=>!u.deletedAt).map(u=>({...u,employeeCount:db.employees.filter(e=>!e.deletedAt&&e.organisationUnitId===u.id&&inScope(scope,user,db.units,e.organisationUnitId,e.id)).length,assetCount:db.assets.filter(a=>a.organisationUnitId===u.id&&inScope(scope,user,db.units,a.organisationUnitId,a.currentAssigneeId)).length,depth:unitPath(db.units,u.id).length-1}));}
function demand(id:string){const {db,user,scope}=access('organisation','manage');if(scope!=='all'&&!descendantIds(db.units,user.organisationUnitId).includes(id))throw new Error('Access denied. This unit is outside your team.');}
export const OrganisationService={
 async list(query:{search?:string}={}){await delay();const {db,user,scope}=access('organisation');const permitted=scope==='all'?db.units.map(u=>u.id):[...unitPath(db.units,user.organisationUnitId).map(u=>u.id),...descendantIds(db.units,user.organisationUnitId)];return clone(countedUnits().filter(u=>permitted.includes(u.id)&&(!query.search||u.name.toLowerCase().includes(query.search.toLowerCase()))));},
 async getById(id:string){const units=await this.list();return requireRecord(units.find(u=>u.id===id&&!u.deletedAt),'Organisation unit');},
 async create(input:UnitInput){await delay();const db=getDB();if(!input.name.trim()||!input.type.trim())throw new Error('Unit name and type are required.');if(!input.parentId)throw new Error('Select a parent unit.');requireRecord(db.units.find(u=>u.id===input.parentId&&!u.deletedAt),'Parent unit');demand(input.parentId);if(input.managerId)requireRecord(db.employees.find(e=>e.id===input.managerId&&!e.deletedAt),'Manager');return clone(transaction(()=>{const unit={...input,id:newId('UNIT'),employeeCount:0,assetCount:0,depth:0};db.units.push(unit);auditEvent('Org unit created','Organisation',unit.id,{name:unit.name});return unit;}));},
 async update(id:string,input:UnitInput){await delay();demand(id);const db=getDB(),unit=requireRecord(db.units.find(u=>u.id===id&&!u.deletedAt),'Unit');if(!input.name.trim()||!input.type.trim())throw new Error('Unit name and type are required.');
 if(!unit.parentId&&input.parentId)throw new Error('The root unit cannot be moved.');if(unit.parentId&&!input.parentId)throw new Error('A parent unit is required.');
 if(input.parentId){requireRecord(db.units.find(u=>u.id===input.parentId&&!u.deletedAt),'Parent');demand(input.parentId);if(descendantIds(db.units,id).includes(input.parentId))throw new Error('A unit cannot be moved inside itself.');}
 if(input.managerId)requireRecord(db.employees.find(e=>e.id===input.managerId&&!e.deletedAt),'Manager');
 return clone(transaction(()=>{Object.assign(unit,input);auditEvent('Org unit updated','Organisation',id,{name:unit.name});return unit;}));},
 async delete(id:string){await delay();demand(id);const db=getDB(),unit=requireRecord(db.units.find(u=>u.id===id&&!u.deletedAt),'Unit');if(!unit.parentId)throw new Error('The root unit cannot be deleted.');if(db.units.some(u=>u.parentId===id&&!u.deletedAt)||db.employees.some(e=>!e.deletedAt&&e.organisationUnitId===id)||db.assets.some(a=>a.organisationUnitId===id))throw new Error('Move child units, employees and assets before deleting this unit.');
 transaction(()=>{auditEvent('Org unit deleted','Organisation',id,{name:unit.name});unit.deletedAt=new Date().toISOString();});},
};

