import {useFilterParams} from '@/hooks/useFilterParams';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Plus,Upload} from 'lucide-react';
import type {Employee,EmployeeQuery} from '@/types';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {useNotifications} from '@/hooks/useNotifications';
import {EmployeeService} from '@/services/EmployeeService';
import {ReferenceService} from '@/services/ReferenceService';
import {EmployeeTable} from '@/components/employees/EmployeeTable';
import {EmployeeFilters} from '@/components/employees/EmployeeFilters';
import {EmployeeEditor} from '@/components/employees/EmployeeEditor';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {ConfirmDialog} from '@/components/ui/RecordEditor';
import {can} from '@/utils/permissions';
export default function EmployeesPage(){
 const [params,setParams]=useFilterParams(),[editing,setEditing]=useState<Employee|undefined>(),[deleting,setDeleting]=useState<Employee|null>(null),[add,setAdd]=useState(params.get('add')==='true');const {permissions}=useSession(),{toast}=useNotifications();const filters:EmployeeQuery={search:params.get('search')||'',unitId:params.get('unitId')||'',role:params.get('role')||'',status:params.get('status')||''};
 const query=useQuery(async()=>{const [employees,refs]=await Promise.all([EmployeeService.list(filters),ReferenceService.list()]);return {employees,refs};},JSON.stringify(filters));const data=query.data,manage=can(permissions,'employees','manage');
 const clearEditor=()=>{setEditing(undefined);setAdd(false);if(params.has('add')){const p=new URLSearchParams(params);p.delete('add');setParams(p,{replace:true});}};
 return <><PageHeading eyebrow="PEOPLE MANAGEMENT" title="Employees" description="The people behind your organisation. All connected, all in view." actions={manage?<><Link className="btn btn-outline" to="/employees/import"><Upload size={16}/>Import employees</Link><Button onClick={()=>setAdd(true)}><Plus size={16}/>Add employee</Button></>:undefined}/><Panel><EmployeeFilters query={filters} onChange={values=>setParams(Object.fromEntries(Object.entries(values).filter(([,v])=>v)),{replace:true})} units={data?.refs.units.map(u=>({value:u.id,label:u.name}))||[]} roles={data?.refs.roles.map(r=>({value:r.id,label:r.name}))||[]}/>{params.has('identity')&&<div className="panel-body inline between"><span>Identity status: {params.get('identity')}</span><Button variant="ghost" onClick={()=>setParams({})}>Clear filter</Button></div>}<QueryState query={query}>{data&&<EmployeeTable employees={data.employees.filter(e=>!params.has('identity')||e.identityStatus===params.get('identity'))} units={Object.fromEntries(data.refs.units.map(u=>[u.id,u.name]))} roles={Object.fromEntries(data.refs.roles.map(r=>[r.id,r.name]))} onEdit={manage?setEditing:undefined} onDelete={manage?setDeleting:undefined} emptyAction={manage?<Button onClick={()=>setAdd(true)}>Add your first employee</Button>:undefined}/>}</QueryState></Panel>{manage&&(add||editing)&&<EmployeeEditor employee={editing} onClose={clearEditor}/>} {deleting&&<ConfirmDialog title="Delete employee?" message={'Remove '+deleting.name+' from the employee directory? Their audit and assignment history will be retained.'} label="Delete employee" destructive onClose={()=>setDeleting(null)} onConfirm={async()=>{await EmployeeService.delete(deleting.id);toast('Employee deleted');}}/>}</>;
}

