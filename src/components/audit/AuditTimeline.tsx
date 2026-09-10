import type {AuditEvent} from '@/types';
import {formatDate} from '@/utils/formatDate';
import {Badge} from '@/components/ui/Badge';
import {EmptyState} from '@/components/ui/EmptyState';
export function AuditTimeline({events,names={}}:{events:AuditEvent[];names?:Record<string,string>}){return events.length?<ol className="timeline">{events.map(e=><li key={e.id}><span className="timeline-marker"/><div><div className="inline between"><strong>{e.action}</strong><Badge>{e.status}</Badge></div><p>{names[e.actorId]||e.actorId} · {e.metadata.name||e.entityId}</p><small>{formatDate(e.createdAt,true)}</small></div></li>)}</ol>:<EmptyState title="No activity yet" description="New workspace activity will appear here."/>;}

