import {useState} from 'react';
import {Link} from 'react-router-dom';
import {UserPlus} from 'lucide-react';
import {useQuery} from '@/hooks/useQuery';
import {useNotifications} from '@/hooks/useNotifications';
import {EmployeeService} from '@/services/EmployeeService';
import {RoleService} from '@/services/RoleService';
import {delay} from '@/services/store';
import {Panel,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {RecordEditor} from '@/components/ui/RecordEditor';
export default function UsersSettings(){const [inviting,setInviting]=useState(false),{toast}=useNotifications(),query=useQuery(async()=>{const [employees,roles]=await Promise.all([EmployeeService.list(),RoleService.list()]);return {employees,roles};}),d=query.data;return <><Panel title="Users & access" description="Manage workspace membership" actions={<Button onClick={()=>setInviting(true)}><UserPlus size={15}/>Invite user</Button>}><QueryState query={query}>{d&&<Table rows={d.employees} caption="Workspace users" columns={[{key:'name',title:'User',render:e=><Link to={'/employees/'+e.id}>{e.name}</Link>},{key:'role',title:'Role',render:e=>d.roles.find(r=>r.id===e.role)?.name},{key:'status',title:'Status',render:e=><Badge>{e.status}</Badge>}]}/>}</QueryState></Panel>{inviting&&d&&<RecordEditor title="Invite a user" submitLabel="Create demo invitation" fields={[{key:'email',label:'Work email',type:'email',required:true},{key:'role',label:'Role',required:true,options:d.roles.map(r=>({value:r.id,label:r.name})),help:'Invitations are simulated. No email will be sent.'}]} initial={{role:'employee'}} onClose={()=>setInviting(false)} onSave={async v=>{await delay();toast('Demo invitation prepared for '+v.email,'info');}}/>}</>;}

