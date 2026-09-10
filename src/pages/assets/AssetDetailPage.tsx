import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {UserPlus,ArrowRightLeft,Undo2,Pencil,ShieldCheck} from 'lucide-react';
import type {Asset} from '@/types';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {useNotifications} from '@/hooks/useNotifications';
import {AssetService} from '@/services/AssetService';
import {ReferenceService} from '@/services/ReferenceService';
import {AuditService} from '@/services/AuditService';
import {AssetDetails} from '@/components/assets/AssetDetails';
import {AssetHistory} from '@/components/assets/AssetHistory';
import {AssetEditor} from '@/components/assets/AssetEditor';
import {AssetAssignment} from '@/components/assets/AssetAssignment';
import {AssetTransfer} from '@/components/assets/AssetTransfer';
import {AssetReturn} from '@/components/assets/AssetReturn';
import {AuditTimeline} from '@/components/audit/AuditTimeline';
import {PageHeading,Panel,QueryState,Tabs} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {can} from '@/utils/permissions';
export default function AssetDetailPage(){
 const {assetId}=useParams(),{permissions,organisation}=useSession(),{toast}=useNotifications();const [flow,setFlow]=useState<{kind:'assign'|'transfer'|'return'|'edit';asset:Asset}|null>(null),[verifying,setVerifying]=useState(false),[tab,setTab]=useState('Assignment history');
 const query=useQuery(async()=>{const asset=await AssetService.getById(assetId!);const [history,refs,audit]=await Promise.all([AssetService.history(asset.id),ReferenceService.list(),can(permissions,'audit')?AuditService.list({entityId:asset.id}):Promise.resolve([])]);return {asset,history,refs,audit};},assetId);
 const d=query.data,names=Object.fromEntries((d?.refs.employees||[]).map(e=>[e.id,e.name]));const assign=can(permissions,'assets','assign'),manage=can(permissions,'assets','manage');
 return <><PageHeading eyebrow="ASSET DETAILS" title={d?.asset.name||'Asset details'} description={d?d.asset.assetId+' · '+d.asset.type+' asset':undefined} actions={d&&!query.loading?<>{manage&&<Button variant="outline" onClick={()=>setFlow({kind:'edit',asset:d.asset})}><Pencil size={15}/>Edit</Button>}{assign&&(d.asset.currentAssigneeId?<><Button variant="outline" onClick={()=>setFlow({kind:'return',asset:d.asset})}><Undo2 size={15}/>Return</Button><Button onClick={()=>setFlow({kind:'transfer',asset:d.asset})}><ArrowRightLeft size={15}/>Transfer asset</Button></>:<Button disabled={d.asset.status==='In Maintenance'} title={d.asset.status==='In Maintenance'?'An asset in maintenance cannot be assigned.':undefined} onClick={()=>setFlow({kind:'assign',asset:d.asset})}><UserPlus size={15}/>Assign asset</Button>)}{manage&&<Button variant="outline" disabled={verifying||d.asset.blockchainStatus==='Verified'} onClick={async()=>{setVerifying(true);try{await AssetService.verify(d.asset.id);toast('Asset verified in the demo');}catch(e){toast((e as Error).message,'error');}finally{setVerifying(false);}}}><ShieldCheck size={15}/>{verifying?'Verifying…':d.asset.blockchainStatus==='Verified'?'Verified':'Verify'}</Button>}</>:undefined}/><QueryState query={query}>{d&&<><AssetDetails asset={d.asset} assignment={d.history.find(h=>h.status==='Active')} names={names} unitName={d.refs.units.find(u=>u.id===d.asset.organisationUnitId)?.name||d.asset.organisationUnitId} organisationName={organisation!.name}/><Tabs tabs={can(permissions,'audit')?['Assignment history','Activity']:['Assignment history']} active={tab} onChange={setTab}/><Panel title={tab} description="A permanent record of changes to this asset">{tab==='Assignment history'?<AssetHistory assignments={d.history} names={names}/>:<AuditTimeline events={d.audit} names={names}/>}</Panel></>}</QueryState>{flow?.kind==='edit'&&<AssetEditor asset={flow.asset} onClose={()=>setFlow(null)}/>} {flow?.kind==='assign'&&<AssetAssignment asset={flow.asset} onClose={()=>setFlow(null)}/>} {flow?.kind==='transfer'&&<AssetTransfer asset={flow.asset} currentName={names[flow.asset.currentAssigneeId!]||flow.asset.currentAssigneeId!} onClose={()=>setFlow(null)}/>} {flow?.kind==='return'&&<AssetReturn asset={flow.asset} assignee={names[flow.asset.currentAssigneeId!]||flow.asset.currentAssigneeId!} onClose={()=>setFlow(null)}/>}</>;
}

