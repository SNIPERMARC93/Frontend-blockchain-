import {useSession} from '@/hooks/useSession';
import {SettingsForm} from './SettingsForm';
export default function AccountSettings(){const {user}=useSession();return <SettingsForm page="account" title="Your account" description="Personal profile and password-change preview" initial={{name:user?.name||'',email:user?.email||'',designation:user?.designation||'',newPassword:'',confirmPassword:''}} fields={[{key:'name',label:'Full name',required:true},{key:'email',label:'Email address',type:'email',required:true},{key:'designation',label:'Designation'},{key:'newPassword',label:'New password (optional)',type:'password',description:'Password changes are simulated. Passwords are never saved in local storage.'},{key:'confirmPassword',label:'Confirm new password',type:'password'}]}/>;}

