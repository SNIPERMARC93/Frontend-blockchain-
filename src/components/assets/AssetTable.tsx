import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Laptop,FileBadge} from 'lucide-react';
import type {Asset} from '@/types';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {EmptyState} from '@/components/ui/EmptyState';
export function AssetTable({assets,employees={},units={},emptyAction}:{assets:Asset[];employees?:Record<string,string>;units?:Record<string,string>;emptyAction?:ReactNode}){return <Table rows={assets} caption="Assets" empty={<EmptyState title="No assets found" description="Register an asset or adjust your filters to see more records." action={emptyAction}/>} columns={[{key:'id',title:'Asset ID',render:a=><span className="mono">{a.assetId}</span>},{key:'name',title:'Asset',render:a=><Link className="person-cell" to={'/assets/'+a.id}>{a.type==='Physical'?<Laptop size={19}/>:<FileBadge size={19}/>}<div><strong>{a.name}</strong><small>{a.serialNumber}</small></div></Link>},{key:'type',title:'Type',render:a=>a.type},{key:'status',title:'Status',render:a=><Badge>{a.status}</Badge>},{key:'assignee',title:'Assignee',render:a=>a.currentAssigneeId?<Link to={'/employees/'+a.currentAssigneeId}>{employees[a.currentAssigneeId]||a.currentAssigneeId}</Link>:'Unassigned'},{key:'unit',title:'Unit',render:a=><Link to={'/organisation/'+a.organisationUnitId}>{units[a.organisationUnitId]||a.organisationUnitId}</Link>},{key:'actions',title:'Actions',render:a=><Link to={'/assets/'+a.id} className="btn btn-ghost" aria-label={'View '+a.name}><ArrowUpRight size={16}/></Link>}]}/>;}

