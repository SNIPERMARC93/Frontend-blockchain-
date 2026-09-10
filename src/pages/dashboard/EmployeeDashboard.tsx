import {Link} from 'react-router-dom';
import {ShieldCheck,Network,ArrowUpRight} from 'lucide-react';
import {useSession} from '@/hooks/useSession';
import {useQuery} from '@/hooks/useQuery';
import {AssetService} from '@/services/AssetService';
import {OrganisationService} from '@/services/OrganisationService';
import {AuditService} from '@/services/AuditService';
import {AssetCard} from '@/components/assets/AssetCard';
import {AuditTimeline} from '@/components/audit/AuditTimeline';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Badge} from '@/components/ui/Badge';
import {EmptyState} from '@/components/ui/EmptyState';
import {unitPath} from '@/utils/buildTree';
export default function EmployeeDashboard(){const {user,organisation,role}=useSession();const query=useQuery(async()=>{const [assets,units,audit]=await Promise.all([AssetService.list({assigneeId:user!.id}),OrganisationService.list(),AuditService.personal(user!.id)]);return {assets,units,audit};},user?.id);
 return <><PageHeading eyebrow="MY WORKSPACE" title={'Welcome back, '+user?.name.split(' ')[0]} description={'Your identity, access and assets at '+organisation?.name+'.'}/><QueryState query={query}>{query.data&&<><div className="dashboard-grid"><Panel title="My identity"><div className="panel-body"><span className="asset-icon"><ShieldCheck/></span><h3>{user?.name}</h3><p className="subtle">{role?.name}</p><Badge>{user?.identityStatus}</Badge><p><Link className="text-link" to={'/employees/'+user?.id+'?tab=Identity'}>View identity <ArrowUpRight size={15}/></Link></p></div></Panel><Panel title="My organisation"><div className="panel-body"><span className="asset-icon"><Network/></span><h3>{query.data.units.find(u=>u.id===user?.organisationUnitId)?.name}</h3><p className="subtle">{unitPath(query.data.units,user!.organisationUnitId).map(u=>u.name).join(' / ')}</p><Link className="text-link" to={'/organisation/'+user?.organisationUnitId}>Explore my team <ArrowUpRight size={15}/></Link></div></Panel></div><Panel title="My assets" description="Equipment and digital resources assigned to you"><div className="panel-body">{query.data.assets.length?<div className="cards-grid">{query.data.assets.map(a=><AssetCard key={a.id} asset={a}/>)}</div>:<EmptyState title="No assets assigned yet" description="Your assigned equipment and software will appear here." action={<Link to={'/employees/'+user?.id} className="btn btn-outline">View my profile</Link>}/>}</div></Panel><Panel title="Recent activity"><AuditTimeline events={query.data.audit.slice(0,10)}/></Panel></>}</QueryState></>;
}

