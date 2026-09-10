import type {AuditEvent} from '@/types';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {formatDate} from '@/utils/formatDate';
export function AuditTable({events,names}:{events:AuditEvent[];names:Record<string,string>}){return <Table caption="Audit history" rows={events} columns={[{key:'date',title:'Date & time',render:e=>formatDate(e.createdAt,true)},{key:'actor',title:'Actor',render:e=>names[e.actorId]||e.actorId},{key:'action',title:'Action',render:e=><span title={Object.entries(e.metadata).map(([k,v])=>k+': '+v).join('\n')} style={{color:'#e2e8f0'}}>{e.action}</span>},{key:'entity',title:'Entity',render:e=>e.entity},{key:'id',title:'Entity ID',render:e=><span className="mono">{e.entityId}</span>},{key:'status',title:'Status',render:e=><Badge>{e.status}</Badge>}]}/>;}

