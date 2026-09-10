import type {Employee,CreateEmployeeInput} from '@/types';
import {RecordEditor} from '@/components/ui/RecordEditor';
import {useReferences} from '@/hooks/useReferences';
import {useSession} from '@/hooks/useSession';
import {useNotifications} from '@/hooks/useNotifications';
import {EmployeeService} from '@/services/EmployeeService';
import {permissionScope} from '@/utils/permissions';
import {QueryState} from '@/components/ui/Page';
import {Modal} from '@/components/ui/Modal';
export function EmployeeEditor({employee,onClose}:{employee?:Employee;onClose:()=>void}){
 const refs=useReferences(),{user,permissions}=useSession(),{toast}=useNotifications();if(!refs.data)return <Modal title="Employee details" onClose={onClose}><QueryState query={refs}>{null}</QueryState></Modal>;
 const full=permissionScope(permissions,'employees','manage')==='all';
 return <RecordEditor title={employee?'Edit employee':'Add employee'} onClose={onClose} submitLabel={employee?'Save employee':'Add employee'} initial={employee?{name:employee.name,email:employee.email,designation:employee.designation,organisationUnitId:employee.organisationUnitId,managerId:employee.managerId||'',role:employee.role,status:employee.status,identityStatus:employee.identityStatus}:{organisationUnitId:user?.organisationUnitId||'',role:'employee',status:'Active',identityStatus:'Pending'}} fields={[{key:'name',label:'Full name',required:true},{key:'email',label:'Work email',type:'email',required:true},{key:'designation',label:'Designation',required:true},{key:'organisationUnitId',label:'Organisation unit',required:true,options:refs.data.units.map(u=>({value:u.id,label:u.name}))},{key:'managerId',label:'Reporting manager',options:refs.data.employees.filter(e=>e.id!==employee?.id&&!e.deletedAt).map(e=>({value:e.id,label:e.name}))},{key:'role',label:'Role',required:true,disabled:!full,options:refs.data.roles.map(r=>({value:r.id,label:r.name}))},{key:'status',label:'Status',required:true,options:['Active','Inactive'].map(v=>({value:v,label:v}))},{key:'identityStatus',label:'Identity status',required:true,options:['Pending','Verified','Revoked'].map(v=>({value:v,label:v}))}]} onSave={async v=>{const input={...v,managerId:v.managerId||null} as CreateEmployeeInput;if(employee)await EmployeeService.update(employee.id,input);else await EmployeeService.create(input);toast(employee?'Employee updated':'Employee added');}}/>;
}

