import {useSession} from '@/hooks/useSession';
import {SettingsForm} from './SettingsForm';
export default function OrgSettings(){const {organisation}=useSession();return <SettingsForm page="organisation" title="Organisation details" description="Your organisation’s public workspace information" initial={{name:organisation?.name||'',contact:organisation?.contact||'',slug:organisation?.slug||'',logo:''}} fields={[{key:'name',label:'Organisation name',required:true},{key:'contact',label:'Contact email',type:'email'},{key:'slug',label:'Workspace slug',required:true},{key:'logo',label:'Logo URL',type:'url',description:'Add a logo URL for future backend integration.'}]}/>;}

