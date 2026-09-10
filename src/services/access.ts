import type { Resource, Action, Employee, Asset } from '@/types';
import { getDB, getActor } from './store';
import { inScope, permissionScope } from '@/utils/permissions';
export function access(resource: Resource, action: Action='view'){const db=getDB(),user=getActor();const role=db.roles.find(r=>r.id===user.role);const scope=permissionScope(role?.permissions||[],resource,action);if(!scope)throw new Error('Access denied. You do not have permission to '+action+' '+resource+'.');return {db,user,scope};}
export function visibleEmployee(e:Employee,resource:Resource='employees',action:Action='view'){const {db,user,scope}=access(resource,action);return inScope(scope,user,db.units,e.organisationUnitId,e.id);}
export function visibleAsset(a:Asset,action:Action='view'){const {db,user,scope}=access('assets',action);return inScope(scope,user,db.units,a.organisationUnitId,a.currentAssigneeId);}
export function demandEmployee(e:Employee,action:Action='view'){if(!visibleEmployee(e,'employees',action))throw new Error('Access denied. This employee is outside your permitted scope.');}
export function demandAsset(a:Asset,action:Action='view'){if(!visibleAsset(a,action))throw new Error('Access denied. This asset is outside your permitted scope.');}
export function requireRecord<T>(record:T|undefined,label='Record'):T{if(!record)throw new Error(label+' not found.');return record;}

