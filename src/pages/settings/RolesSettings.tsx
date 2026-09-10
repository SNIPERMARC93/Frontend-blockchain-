import {SettingsForm} from './SettingsForm';
export default function RolesSettings(){return <SettingsForm page="structure" title="Organisation structure" description="Configure the language used for organisation units" initial={{unitTypes:'Headquarters, Division, Department, Team',defaultType:'Team'}} fields={[{key:'unitTypes',label:'Unit types',description:'Separate names with commas. Demo configuration only.',required:true},{key:'defaultType',label:'Default unit type',options:['Team','Department','Division']}]}/>;}

