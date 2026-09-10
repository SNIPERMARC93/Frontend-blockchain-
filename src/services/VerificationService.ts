// TODO: replace mock operations with authenticated API requests to /api/verification.
import type { VerificationResultData, Resource, Action } from '@/types';
import { delay, newId, transaction, auditEvent } from './store';
import { access, demandAsset, requireRecord } from './access';
import { can, inScope } from '@/utils/permissions';
export const VerificationService={
 async verify(kind:VerificationResultData['kind'],id:string,resource:Resource='assets',action:Action='view'):Promise<VerificationResultData>{
  await delay();const {db,user,scope}=access('verification');id=id.trim();if(!id)throw new Error('Enter an ID to verify.');
  let name='',record='',verified=false,entityId='',entity:'Asset'|'Identity'|'Employee'='Employee';
  if(kind==='Asset'){const a=requireRecord(db.assets.find(a=>a.id===id||a.assetId===id),'Asset');demandAsset(a);name=a.name;entity='Asset';entityId=a.id;record=db.employees.find(e=>e.id===a.currentAssigneeId)?.name||'Unassigned';verified=a.blockchainStatus==='Verified';}
  else{const identity=db.identities.find(i=>i.did===id||i.id===id);const e=requireRecord(db.employees.find(e=>(e.id===id||e.employeeId===id||e.id===identity?.employeeId)&&!e.deletedAt),'Employee or identity');if(!inScope(scope,user,db.units,e.organisationUnitId,e.id))throw new Error('Access denied. This identity is outside your permitted scope.');name=e.name;entityId=e.id;record=kind==='Identity'?(db.identities.find(i=>i.employeeId===e.id)?.did||'No identity issued'):resource+' · '+action;verified=kind==='Identity'?e.identityStatus==='Verified':e.status==='Active'&&e.identityStatus==='Verified'&&can(db.roles.find(r=>r.id===e.role)?.permissions||[],resource,action);}
  const result={verified,kind,name,id,record,message:verified?'The mock record is valid.':kind==='Identity'?'Identity is pending or revoked.':kind==='Asset'?'This asset has not been verified.':'This identity does not satisfy the selected permission and active identity checks.',transactionRef:newId('TX-DEMO'),checkedAt:new Date().toISOString()};
  transaction(()=>{auditEvent(kind+' verification performed',entity,entityId,{name,source:'Mock verification',transactionRef:result.transactionRef},verified?'Success':'Failed');});return result;
 }
};

