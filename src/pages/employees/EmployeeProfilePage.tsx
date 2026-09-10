import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Pencil} from 'lucide-react';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {EmployeeService} from '@/services/EmployeeService';
import {AssetService} from '@/services/AssetService';
import {IdentityService} from '@/services/IdentityService';
import {AuditService} from '@/services/AuditService';
import {ReferenceService} from '@/services/ReferenceService';
import {EmployeeProfile} from '@/components/employees/EmployeeProfile';
import {EmployeeEditor} from '@/components/employees/EmployeeEditor';
import {PageHeading,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {can} from '@/utils/permissions';
import {initials} from '@/utils/formatDate';
export default function EmployeeProfilePage(){const {employeeId}=useParams(),{permissions}=useSession(),[editing,setEditing]=useState(false);
 const query=useQuery(async()=>{const employee=await EmployeeService.getById(employeeId!);const [assets,identity,audit,refs]=await Promise.all([AssetService.list({assigneeId:employee.id}),IdentityService.getByEmployeeId(employee.id),AuditService.personal(employee.id),ReferenceService.list()]);return {employee,assets,identity,audit,refs};},employeeId);
 const d=query.data;return <><PageHeading eyebrow="EMPLOYEE PROFILE" title={d?.employee.name||'Employee profile'} description={d?.employee.designation} actions={d&&can(permissions,'employees','manage')?<Button variant="outline" onClick={()=>setEditing(true)}><Pencil size={16}/>Edit employee</Button>:undefined}/><QueryState query={query}>{d&&<><div className="profile-heading"><span className="avatar large">{initials(d.employee.name)}</span><div><strong>{d.employee.name}</strong><p className="subtle">{d.employee.email}</p></div></div><EmployeeProfile employee={d.employee} assets={d.assets} identity={d.identity} audit={d.audit} units={d.refs.units} manager={d.refs.employees.find(e=>e.id===d.employee.managerId)?.name} roleName={d.refs.roles.find(r=>r.id===d.employee.role)?.name||d.employee.role}/></>}</QueryState>{editing&&d&&<EmployeeEditor employee={d.employee} onClose={()=>setEditing(false)}/>}</>;}

