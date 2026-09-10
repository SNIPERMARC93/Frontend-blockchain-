import {useState} from 'react';
import {Building2,Database,Users,Mail} from 'lucide-react';
import {Panel} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {Badge} from '@/components/ui/Badge';
import {useNotifications} from '@/hooks/useNotifications';
export default function IntegrationsSettings(){const [selected,setSelected]=useState(''),{toast}=useNotifications();const integrations=[{name:'HR System',description:'Sync people and reporting relationships.',icon:Users},{name:'ERP',description:'Connect procurement and asset records.',icon:Database},{name:'Directory',description:'Bring your company directory into one place.',icon:Building2},{name:'Email provider',description:'Send organisation invitations and updates.',icon:Mail}];return <Panel title="Integrations" description="Connection previews · Backend integrations coming later"><div className="panel-body cards-grid">{integrations.map(i=><div className="integration-card" key={i.name}><i.icon size={26}/><h3>{i.name}</h3><Badge>{selected===i.name?'Preview selected':'Not connected'}</Badge><p>{i.description}</p><Button variant="outline" onClick={()=>{setSelected(i.name);toast(i.name+' configuration is a demo placeholder.','info');}}>Configure</Button></div>)}</div></Panel>;}

