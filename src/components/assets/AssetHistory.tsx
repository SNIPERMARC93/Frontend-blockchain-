import type {AssetAssignment} from '@/types';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {EmptyState} from '@/components/ui/EmptyState';
import {formatDate} from '@/utils/formatDate';
export function AssetHistory({assignments,names}:{assignments:AssetAssignment[];names:Record<string,string>}){return <Table rows={assignments} caption="Asset assignment history" empty={<EmptyState title="No assignment history yet" description="Assignments, transfers and returns will be recorded here."/>} columns={[{key:'date',title:'Assigned',render:a=>formatDate(a.assignedAt,true)},{key:'employee',title:'Employee',render:a=>names[a.assigneeId]||a.assigneeId},{key:'reason',title:'Reason',render:a=><span style={{whiteSpace:'normal',minWidth:150,display:'block'}}>{a.reason}</span>},{key:'status',title:'Status',render:a=><Badge>{a.status}</Badge>},{key:'closed',title:'Closed',render:a=>formatDate(a.returnedAt,true)},{key:'reference',title:'Transaction Reference',render:a=><span className="mono">{a.transactionRef}</span>}]}/>;}

