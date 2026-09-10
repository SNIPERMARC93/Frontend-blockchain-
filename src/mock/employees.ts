import type { Employee, Identity } from '@/types';
const rows = [
 ['Ananya Sharma','Chief Operating Officer','hq','admin',null],
 ['Vikram Rao','VP of Technology','tech','manager','E001'],
 ['Priya Mehta','Head of Operations','ops','manager','E001'],
 ['Arjun Patel','Head of Sales','sales','manager','E001'],
 ['Rahul Verma','Frontend Lead','frontend','manager','E002'],
 ['Neha Singh','Backend Lead','backend','manager','E002'],
 ['Maya Iyer','Compliance Auditor','finance','auditor','E003'],
 ['Aarav Shah','Frontend Engineer','frontend','employee','E005'],
 ['Ishita Gupta','Product Designer','frontend','employee','E005'],
 ['Rohan Das','Backend Engineer','backend','employee','E006'],
 ['Kavya Nair','Platform Engineer','infra','employee','E002'],
 ['Aditya Jain','People Partner','hr','employee','E003'],
 ['Diya Kapoor','Finance Analyst','finance','employee','E003'],
 ['Kabir Sethi','Account Executive','enterprise','employee','E004'],
 ['Sara Thomas','Account Executive','smb','employee','E004'],
 ['Dev Malhotra','Frontend Engineer','frontend','employee','E005'],
 ['Anika Bose','Backend Engineer','backend','employee','E006'],
 ['Siddharth Roy','Systems Administrator','infra','employee','E002'],
 ['Meera Joshi','Talent Specialist','hr','employee','E003'],
 ['Nikhil Menon','Sales Associate','smb','employee','E004'],
 ['Tara Desai','Quality Engineer','engineering','employee','E002'],
 ['Zoya Khan','Enterprise Consultant','enterprise','employee','E004'],
 ['Rehan Ali','DevOps Engineer','infra','employee','E002'],
 ['Avni Bhat','Financial Controller','finance','employee','E003'],
];
export const employees: Employee[] = rows.map(([name,designation,organisationUnitId,role,managerId],i) => ({
 id:'E'+String(i+1).padStart(3,'0'), employeeId:'E'+String(i+1).padStart(3,'0'), name:name!, email:name!.toLowerCase().split(' ').join('.')+'@acme.example',
 designation:designation!, organisationUnitId:organisationUnitId!,role:role!,managerId, status:[15,19,23].includes(i)?'Inactive':'Active',
 identityStatus:[8,18,22].includes(i)?'Pending':i===19?'Revoked':'Verified', createdAt:'2026-02-'+String(i+1).padStart(2,'0')+'T09:00:00Z'
}));
export const identities: Identity[] = employees.map((e,i) => ({id:'I'+String(i+1).padStart(3,'0'),employeeId:e.id,did:'did:example:acme:'+e.id.toLowerCase(),status:e.identityStatus,verifiedAt:e.identityStatus==='Verified'?e.createdAt:null}));

