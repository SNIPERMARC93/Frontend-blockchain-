// TODO: replace mock operations with authenticated API requests to /api/references.
import {getDB,getActor,delay,clone} from './store';
import {permissionScope,inScope} from '@/utils/permissions';
import {unitPath,descendantIds} from '@/utils/buildTree';
export const ReferenceService={async list(){await delay();const db=getDB(),user=getActor(),permissions=db.roles.find(r=>r.id===user.role)?.permissions||[],scope=permissionScope(permissions,'employees');
 const permittedUnits=scope==='all'?db.units.map(u=>u.id):[...unitPath(db.units,user.organisationUnitId).map(u=>u.id),...(scope==='team'?descendantIds(db.units,user.organisationUnitId):[user.organisationUnitId])];
 return clone({employees:db.employees.filter(e=>inScope(scope,user,db.units,e.organisationUnitId,e.id)||e.id===user.managerId).map(e=>({id:e.id,name:e.name,status:e.status,organisationUnitId:e.organisationUnitId,role:e.role,deletedAt:e.deletedAt})),units:db.units.filter(u=>!u.deletedAt&&permittedUnits.includes(u.id)),roles:db.roles.filter(r=>!r.deletedAt&&(scope!=='own'||r.id===user.role)).map(r=>({id:r.id,name:r.name})),categories:db.categories});}};
