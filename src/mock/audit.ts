import type { AuditEvent } from '@/types';
import { employees } from './employees';
import { assignments, assets } from './assets';
export const audit: AuditEvent[] = [
 ...employees.slice(0,12).map((e,i):AuditEvent=>({id:'AU-E'+i,actorId:'E001',action:i===8?'Employee imported':'Employee created',entity:'Employee',entityId:e.id,status:'Success',metadata:{name:e.name},createdAt:e.createdAt})),
 ...assets.slice(0,8).map((a,i):AuditEvent=>({id:'AU-A'+i,actorId:'E001',action:'Asset created',entity:'Asset',entityId:a.id,status:'Success',metadata:{name:a.name},createdAt:a.createdAt})),
 ...assignments.map((a,i):AuditEvent=>({id:'AU-S'+i,actorId:a.assignedById,action:a.status==='Transferred'?'Asset transferred':a.status==='Returned'?'Asset returned':'Asset assigned',entity:'Asset',entityId:a.assetId,status:'Success',metadata:{employeeId:a.assigneeId,transactionRef:a.transactionRef},createdAt:a.returnedAt??a.assignedAt})),
 {id:'AU-R1',actorId:'E001',action:'Role assigned',entity:'Employee',entityId:'E005',status:'Success',metadata:{role:'Manager'},createdAt:'2026-09-08T11:30:00Z'},
 {id:'AU-U1',actorId:'E001',action:'Org unit created',entity:'Organisation',entityId:'smb',status:'Success',metadata:{name:'SMB'},createdAt:'2026-02-01T11:00:00Z'},
 {id:'AU-V1',actorId:'E007',action:'Asset verified',entity:'Asset',entityId:'A002',status:'Success',metadata:{source:'Mock verification'},createdAt:'2026-09-09T07:10:00Z'},
 {id:'AU-I1',actorId:'E001',action:'Employee import failed',entity:'Employee',entityId:'E019',status:'Failed',metadata:{reason:'Duplicate email in an import batch'},createdAt:'2026-09-08T10:00:00Z'},
];

