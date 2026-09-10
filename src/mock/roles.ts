import type { Role, Resource, Action, Scope, Permission } from '@/types';
export const resources: Resource[] = ['employees', 'assets', 'organisation', 'roles', 'audit', 'verification'];
export const actions: Action[] = ['view', 'manage', 'assign', 'audit'];
export const permission = (resource: Resource, action: Action, scope: Scope = 'all'): Permission => ({ id: resource + '.' + action, resource, action, scope });
export const roles: Role[] = [
  { id: 'admin', name: 'Organisation Administrator', description: 'Full control over the organisation, people, access and assets.', isSystem: true, permissions: [...resources, 'settings' as Resource].flatMap(r => actions.map(a => permission(r, a))) },
  { id: 'manager', name: 'Manager', description: 'Manage people and assets within your reporting team.', isSystem: true, permissions: ['employees', 'assets', 'organisation'].flatMap(r => ['view', 'manage', 'assign'].map(a => permission(r as Resource, a as Action, 'team'))).concat([permission('verification','view','team'), permission('audit','view','team')]) },
  { id: 'auditor', name: 'Auditor', description: 'Read organisation records and inspect the audit trail.', isSystem: true, permissions: resources.flatMap(r => [permission(r, 'view'), permission(r, 'audit')]) },
  { id: 'employee', name: 'Employee', description: 'View your own profile, identity and assigned assets.', isSystem: true, permissions: ['employees', 'assets', 'organisation', 'verification'].map(r => permission(r as Resource, 'view', 'own')) },
];

