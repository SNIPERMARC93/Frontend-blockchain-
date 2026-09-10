import {useState} from 'react';
import type {Role,Scope} from '@/types';
import {RoleService} from '@/services/RoleService';
import {useNotifications} from '@/hooks/useNotifications';
import {Modal} from '@/components/ui/Modal';
import {Input} from '@/components/ui/Input';
import {Select} from '@/components/ui/Select';
import {Button} from '@/components/ui/Button';
import {PermissionMatrix} from './PermissionMatrix';
export function RoleEditor({role,onClose}:{role?:Role;onClose:()=>void}){const [name,setName]=useState(role?.name||''),[description,setDescription]=useState(role?.description||''),[permissions,setPermissions]=useState(role?.permissions||[]),[scope,setScope]=useState<Scope>(role?.permissions[0]?.scope||'all'),[busy,setBusy]=useState(false),[error,setError]=useState(''),{toast}=useNotifications();
 return <Modal title={role?'Edit role':'Create role'} onClose={onClose} busy={busy} wide><form onSubmit={async e=>{e.preventDefault();setBusy(true);try{await RoleService.save({name,description,permissions:permissions.map(p=>({...p,scope}))},role?.id);toast(role?'Role updated':'Role created');onClose();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><div className="modal-body stack"><Input label="Role name" value={name} onChange={e=>setName(e.target.value)} required disabled={busy}/><Input label="Description" value={description} onChange={e=>setDescription(e.target.value)} required disabled={busy}/><Select label="Permission scope" options={[{value:'all',label:'Entire organisation'},{value:'team',label:'Own team and child units'},{value:'own',label:'Own records only'}]} value={scope} onChange={e=>setScope(e.target.value as Scope)} disabled={busy}/><PermissionMatrix permissions={permissions} onChange={busy?undefined:setPermissions} scope={scope}/>{error&&<p className="form-error" role="alert">{error}</p>}</div><div className="modal-footer"><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button type="submit" disabled={busy}>{busy?'Saving…':role?'Save role':'Create role'}</Button></div></form></Modal>;
}

