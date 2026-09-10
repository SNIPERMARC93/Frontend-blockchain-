// TODO: replace mock operations with authenticated API requests to /api/audit.
import type { AuditQuery, AuditEvent } from '@/types';
import { delay, clone } from './store';
import { access } from './access';
import { inScope } from '@/utils/permissions';
export function scopedEvents(query:AuditQuery={},personal=false):AuditEvent[]{
 const {db,user,scope}=access(personal?'employees':'audit');const search=query.search?.toLowerCase();
 return db.audit.filter(e=>{
  const employee=db.employees.find(p=>p.id===e.entityId);const asset=db.assets.find(a=>a.id===e.entityId);const previous=db.employees.find(p=>p.id===e.metadata.previousEmployeeId);
  const scoped=scope==='all'||(e.actorId===user.id)||!!(previous&&inScope(scope,user,db.units,previous.organisationUnitId,previous.id))||inScope(scope,user,db.units,employee?.organisationUnitId||asset?.organisationUnitId||'',employee?.id||e.metadata.employeeId||asset?.currentAssigneeId);
  const actor=db.employees.find(p=>p.id===e.actorId)?.name||e.actorId;
  return scoped&&(!query.employeeId||e.entityId===query.employeeId||e.metadata.employeeId===query.employeeId||e.metadata.previousEmployeeId===query.employeeId)&&(!search||(actor+' '+e.entityId+' '+e.action).toLowerCase().includes(search))&&(!query.actorId||e.actorId===query.actorId)&&(!query.entityId||e.entityId===query.entityId)&&(!query.action||e.action===query.action)&&(!query.entity||e.entity===query.entity)&&(!query.status||e.status===query.status)&&(!query.from||e.createdAt.slice(0,10)>=query.from)&&(!query.to||e.createdAt.slice(0,10)<=query.to);
 }).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
}
export const AuditService={
 async list(query:AuditQuery={}){await delay();return clone(scopedEvents(query));},
 async personal(employeeId:string){await delay();const {db,user,scope}=access('employees');const e=db.employees.find(e=>e.id===employeeId&&!e.deletedAt);if(!e||!inScope(scope,user,db.units,e.organisationUnitId,e.id))throw new Error('Access denied.');return clone(scopedEvents({employeeId},true));},
};

