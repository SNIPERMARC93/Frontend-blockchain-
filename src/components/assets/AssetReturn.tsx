import {useState} from 'react';
import type {Asset} from '@/types';
import {AssetService} from '@/services/AssetService';
import {useNotifications} from '@/hooks/useNotifications';
import {Modal} from '@/components/ui/Modal';
import {Button} from '@/components/ui/Button';
import {Details} from '@/components/ui/Page';
import {Badge} from '@/components/ui/Badge';
export function AssetReturn({asset,assignee,onClose}:{asset:Asset;assignee:string;onClose:()=>void}){const [busy,setBusy]=useState(false),[result,setResult]=useState(''),[error,setError]=useState(''),{toast}=useNotifications();return <Modal title={result?'Asset returned':'Return asset?'} onClose={onClose} busy={busy}><div className="modal-body">{result?<div role="status" className="notice success"><Details items={[['Asset',asset.name],['Status',<Badge>Returned</Badge>],['Transaction Reference',result]]}/><p>The asset can now be assigned again.</p></div>:<><p>Confirm the return of {asset.name} from {assignee}.</p><div className="notice">Assigned → Returned. The current assignment will close and its history will be retained.</div></>}{error&&<p role="alert" className="form-error">{error}</p>}</div><div className="modal-footer">{result?<Button onClick={onClose}>Done</Button>:<><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button disabled={busy} onClick={async()=>{setBusy(true);try{setResult(await AssetService.return(asset.id,asset.currentAssigneeId!));toast('Asset returned');}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}>{busy?'Returning…':'Confirm return'}</Button></>}</div></Modal>;}

