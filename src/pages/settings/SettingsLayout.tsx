import {NavLink,Outlet} from 'react-router-dom';
import {PageHeading} from '@/components/ui/Page';
import {useSession} from '@/hooks/useSession';
import {can} from '@/utils/permissions';
const items=[['organisation','Organisation'],['users','Users & Access'],['structure','Organisation Structure'],['assets','Assets'],['identity','Identity'],['integrations','Integrations'],['security','Security'],['notifications','Notifications'],['account','Account']];
export default function SettingsLayout(){const {permissions}=useSession(),manage=can(permissions,'settings','manage');return <><PageHeading eyebrow="WORKSPACE PREFERENCES" title="Settings" description="Manage your organisation and make this workspace yours."/><div className="settings-layout"><nav className="settings-nav" aria-label="Settings navigation">{items.filter(([path])=>manage||['account','notifications'].includes(path)).map(([path,label])=><NavLink key={path} to={'/settings/'+path}>{label}</NavLink>)}</nav><div><Outlet/></div></div></>;}

