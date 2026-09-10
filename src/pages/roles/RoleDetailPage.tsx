import {useState} from 'react';
import {useParams,Link} from 'react-router-dom';
import {Pencil,UserPlus,UserMinus} from 'lucide-react';
import {RoleService} from '@/services/RoleService';
import {ReferenceService} from '@/services/ReferenceService';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {useNotifications} from '@/hooks/useNotifications';
import {RoleEditor} from '@/components/roles/RoleEditor';
import {PermissionMatrix} from '@/components/roles/PermissionMatrix';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {RecordEditor,ConfirmDialog} from '@/components/ui/RecordEditor';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {can} from '@/utils/permissions';
export default function RoleDetailPage(){const {roleId}=useParams(),{permissions}=useSession(),{toast}=useNotifications(),[editing,setEditing]=useState(false),[assign,setAssign]=useState(false),[revoke,setRevoke]=useState<{id:string;name:string}|null>(null);const query=useQuery(async()=>{const [role,refs]=await Promise.all([RoleService.getById(roleId!),ReferenceService.list()]);return {role,refs};},roleId),d=query.data,manage=can(permissions,'roles','manage');
 return <><PageHeading eyebrow="ROLE DETAILS" title={d?.role.name||'Role details'} description={d?.role.description} actions={d&&manage?<>{d.role.id!=='admin'&&<Button variant="outline" onClick={()=>setEditing(true)}><Pencil size={15}/>Edit role</Button>}<Button onClick={()=>setAssign(true)}><UserPlus size={15}/>Assign to employee</Button></>:undefined}/><QueryState query={query}>{d&&<><Panel title="Permission matrix" description={d.role.permissions.length+' permissions · '+(d.role.isSystem?'Protected system role':'Custom role')}><PermissionMatrix permissions={d.role.permissions}/></Panel><div id="members" style={{marginTop:23}}><Panel title="Role members" description="Employees with this role"><Table rows={d.refs.employees.filter(e=>!e.deletedAt&&e.role===d.role.id)} caption="Role members" columns={[{key:'name',title:'Employee',render:e=><Link to={'/employees/'+e.id}>{e.name}</Link>},{key:'id',title:'ID',render:e=><span className="mono">{e.id}</span>},{key:'status',title:'Status',render:e=><Badge>{e.status}</Badge>},{key:'actions',title:'Actions',render:e=>manage&&d.role.id!=='employee'?<Button variant="ghost" onClick={()=>setRevoke(e)}><UserMinus size={15}/>Revoke role</Button>:<Link className="text-link" to={'/employees/'+e.id}>View profile</Link>}]}/></Panel></div></>}</QueryState>{editing&&d&&<RoleEditor role={d.role} onClose={()=>setEditing(false)}/>} {assign&&d&&<RecordEditor title="Assign role to employee" submitLabel="Assign role" initial={{}} fields={[{key:'employeeId',label:'Employee',required:true,options:d.refs.employees.filter(e=>!e.deletedAt&&e.role!==d.role.id).map(e=>({value:e.id,label:e.name}))}]} onClose={()=>setAssign(false)} onSave={async v=>{await RoleService.assign(d.role.id,v.employeeId);toast('Role assigned');}}/>} {revoke&&d&&<ConfirmDialog title="Revoke role?" message={'Remove '+d.role.name+' from '+revoke.name+'? They will receive the standard Employee role.'} label="Revoke role" destructive onClose={()=>setRevoke(null)} onConfirm={async()=>{await RoleService.revoke(d.role.id,revoke.id);toast('Role revoked');}}/>}</>;
}

