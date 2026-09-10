import type { Organisation, OrganisationUnit } from '@/types';
export const organisation: Organisation = { id:'org1', name:'ACME Corporation', slug:'acme', createdAt:'2026-01-05T09:00:00Z', rootUnitId:'hq', contact:'hello@acme.example' };
const rows: [string,string,string|null,string|null][] = [
 ['hq','ACME HQ',null,'E001'], ['tech','Technology','hq','E002'], ['engineering','Engineering','tech','E002'],
 ['frontend','Frontend','engineering','E005'], ['backend','Backend','engineering','E006'], ['infra','Infrastructure','tech','E002'],
 ['ops','Operations','hq','E003'], ['hr','HR','ops','E003'], ['finance','Finance','ops','E003'],
 ['sales','Sales','hq','E004'], ['enterprise','Enterprise','sales','E004'], ['smb','SMB','sales','E004'],
];
export const units: OrganisationUnit[] = rows.map(([id,name,parentId,managerId]) => ({ id,name,parentId,managerId,type:!parentId?'Headquarters':parentId==='hq'?'Division':'Team',employeeCount:0,assetCount:0,depth:0 }));

