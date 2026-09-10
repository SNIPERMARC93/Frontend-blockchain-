import {useFilterParams} from '@/hooks/useFilterParams';

import {Download,ShieldCheck} from 'lucide-react';
import type {AuditQuery} from '@/types';
import {AuditService} from '@/services/AuditService';
import {ReferenceService} from '@/services/ReferenceService';
import {useQuery} from '@/hooks/useQuery';
import {useNotifications} from '@/hooks/useNotifications';
import {AuditFilters} from '@/components/audit/AuditFilters';
import {AuditTable} from '@/components/audit/AuditTable';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
export default function AuditPage(){const [params,setParams]=useFilterParams(),filters:AuditQuery=Object.fromEntries(params),{toast}=useNotifications();const query=useQuery(async()=>{if(filters.from&&filters.to&&filters.from>filters.to)throw new Error('The end date must be on or after the start date.');const [events,allEvents,refs]=await Promise.all([AuditService.list(filters),AuditService.list(),ReferenceService.list()]);return {events,allEvents,refs};},params.toString()),d=query.data;
 return <><PageHeading eyebrow="TRUST & ACCOUNTABILITY" title="Audit history" description="A permanent record of who did what, and when." actions={<Button variant="outline" onClick={()=>toast('Export started','info')}><Download size={16}/>Export</Button>}/><div className="trust-strip"><div className="inline"><ShieldCheck size={21}/><p>Audit records are append-only. Recorded events cannot be edited or deleted.</p></div></div><Panel><AuditFilters query={filters} onChange={q=>setParams(Object.fromEntries(Object.entries(q).filter(([,v])=>v)),{replace:true})} actors={d?.refs.employees.filter(e=>d.allEvents.some(a=>a.actorId===e.id)).map(e=>({value:e.id,label:e.name}))||[]} actions={[...new Set(d?.allEvents.map(e=>e.action)||[])].sort().map(v=>({value:v,label:v}))}/><QueryState query={query}>{d&&<AuditTable events={d.events} names={Object.fromEntries(d.refs.employees.map(e=>[e.id,e.name]))}/>}</QueryState></Panel></>;
}

