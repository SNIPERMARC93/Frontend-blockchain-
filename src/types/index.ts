export type Resource = 'employees' | 'assets' | 'organisation' | 'roles' | 'audit' | 'verification' | 'settings';
export type Action = 'view' | 'manage' | 'assign' | 'audit';
export type Scope = 'all' | 'team' | 'own';
export type Status = 'Active' | 'Inactive';
export type IdentityStatus = 'Verified' | 'Pending' | 'Revoked';
export interface Organisation { id: string; name: string; slug: string; createdAt: string; rootUnitId: string; contact?: string; logo?: string }
export interface OrganisationUnit { id: string; name: string; type: string; parentId: string | null; managerId: string | null; employeeCount: number; assetCount: number; depth: number; deletedAt?: string }
export interface TreeNode extends OrganisationUnit { children: TreeNode[] }
export interface Employee { id: string; employeeId: string; name: string; email: string; designation: string; organisationUnitId: string; managerId: string | null; status: Status; role: string; identityStatus: IdentityStatus; createdAt: string; deletedAt?: string }
export interface Permission { id: string; resource: Resource; action: Action; scope: Scope }
export interface Role { id: string; name: string; description: string; permissions: Permission[]; isSystem: boolean; deletedAt?: string }
export type AssetStatus = 'Assigned' | 'Available' | 'In Maintenance' | 'Returned';
export type AssetType = 'Physical' | 'Digital';
export interface Asset { id: string; assetId: string; name: string; type: AssetType; category: string; subCategory: string; serialNumber: string; condition: string; status: AssetStatus; locationId: string; organisationUnitId: string; currentAssigneeId: string | null; blockchainStatus: 'Verified' | 'Pending' | 'Unregistered'; tokenId: string | null; createdAt: string; expiresAt?: string }
export interface AssetCategory { id: string; name: string; parentId: string | null; type: AssetType }
export interface AssetAssignment { id: string; assetId: string; assigneeId: string; assignedById: string; assignedAt: string; returnedAt: string | null; reason: string; status: 'Active' | 'Transferred' | 'Returned'; transactionRef: string }
export interface AuditEvent { id: string; actorId: string; action: string; entity: 'Employee' | 'Asset' | 'Organisation' | 'Role' | 'Identity'; entityId: string; status: 'Success' | 'Failed' | 'Pending'; metadata: Record<string, string>; createdAt: string }
export interface Identity { id: string; employeeId: string; did: string; status: IdentityStatus; verifiedAt: string | null }
export interface Notification { id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; read: boolean; createdAt: string; link: string }
export interface ToastMessage { id: string; type: Notification['type']; message: string }
export interface EmployeeQuery { search?: string; unitId?: string; role?: string; status?: string }
export interface AssetQuery { search?: string; type?: string; category?: string; status?: string; assigneeId?: string; unitId?: string }
export interface AuditQuery { search?: string; actorId?: string; action?: string; entity?: string; entityId?: string; status?: string; from?: string; to?: string; employeeId?: string }
export type CreateEmployeeInput = Omit<Employee, 'id' | 'employeeId' | 'createdAt' | 'deletedAt'> & { employeeId?: string };
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;
export type CreateAssetInput = Omit<Asset, 'id' | 'assetId' | 'createdAt' | 'currentAssigneeId' | 'blockchainStatus' | 'tokenId'>;
export type UnitInput = Pick<OrganisationUnit, 'name' | 'type' | 'parentId' | 'managerId'>;
export interface ImportRow { row: number; values: Record<string, string>; input?: CreateEmployeeInput; errors: string[]; warnings: string[] }
export interface ImportResult { status: 'success' | 'partial' | 'failed'; imported: number; skipped: number; employees: Employee[]; errors: string[] }
export interface VerificationResultData { verified: boolean; kind: 'Identity' | 'Asset' | 'Authorization'; name: string; id: string; record: string; message: string; transactionRef: string; checkedAt: string }
export interface Database { organisations: Organisation[]; activeOrganisationId: string; units: OrganisationUnit[]; employees: Employee[]; assets: Asset[]; categories: AssetCategory[]; assignments: AssetAssignment[]; roles: Role[]; audit: AuditEvent[]; identities: Identity[] }
export interface SessionRecord { userId: string; organisationId: string | null; mockToken: string; expiresAt: number; pendingUser?: Employee }
