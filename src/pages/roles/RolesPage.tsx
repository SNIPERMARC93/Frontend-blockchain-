import {useState} from 'react';
import {Plus} from 'lucide-react';
import type {Role} from '@/types';
import {RoleService} from '@/services/RoleService';
import {ReferenceService} from '@/services/ReferenceService';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {useNotifications} from '@/hooks/useNotifications';
import {RoleTable} from '@/components/roles/RoleTable';
import {RoleEditor} from '@/components/roles/RoleEditor';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {ConfirmDialog} from '@/components/ui/RecordEditor';
import {can} from '@/utils/permissions';
export default function RolesPage(){const [search,setSearch]=useState(''),[edit,setEdit]=useState<Role|null|undefined>(),[deleting,setDeleting]=useState<Role|null>(null),{permissions}=useSession(),{toast}=useNotifications();const query=useQuery(async()=>{const [roles,refs]=await Promise.all([RoleService.list({search}),ReferenceService.list()]);return {roles,refs};},search),manage=can(permissions,'roles','manage');
 return <><PageHeading eyebrow="ACCESS MANAGEMENT" title="Roles & permissions" description="Give every person the right level of access." actions={manage?<Button onClick={()=>setEdit(null)}><Plus size={16}/>Create role</Button>:undefined}/><Panel><div className="filters"><Input label="Find a role" placeholder="Search role names…" value={search} onChange={e=>setSearch(e.target.value)}/></div><QueryState query={query}>{query.data&&<RoleTable roles={query.data.roles} members={Object.fromEntries(query.data.roles.map(r=>[r.id,query.data!.refs.employees.filter(e=>!e.deletedAt&&e.role===r.id).length]))} onEdit={manage?setEdit:undefined} onDelete={manage?setDeleting:undefined}/>}</QueryState></Panel>{edit!==undefined&&<RoleEditor role={edit||undefined} onClose={()=>setEdit(undefined)}/>} {deleting&&<ConfirmDialog title="Delete role?" message={'Delete '+deleting.name+'? Reassign any members before deleting this role.'} label="Delete role" destructive onClose={()=>setDeleting(null)} onConfirm={async()=>{await RoleService.delete(deleting.id);toast('Role deleted');}}/>}</>;
}

