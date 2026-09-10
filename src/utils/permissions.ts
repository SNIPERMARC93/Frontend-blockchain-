import type { Action, Employee, Permission, Resource, OrganisationUnit, Scope } from '@/types';
import { descendantIds } from './buildTree';
export function can(permissions: Permission[], resource: Resource, action: Action = 'view') { return permissions.some(p=>p.resource===resource&&p.action===action); }
export function permissionScope(permissions: Permission[], resource: Resource, action: Action = 'view'): Scope | null { const scopes=permissions.filter(p=>p.resource===resource&&p.action===action).map(p=>p.scope);return scopes.includes('all')?'all':scopes.includes('team')?'team':scopes.includes('own')?'own':null; }
export function inScope(scope: Scope | null, user:Employee, units:OrganisationUnit[], unitId:string, employeeId?:string|null){return scope==='all'||(scope==='own'&&employeeId===user.id)||(scope==='team'&&(employeeId===user.id||descendantIds(units,user.organisationUnitId).includes(unitId)));}

