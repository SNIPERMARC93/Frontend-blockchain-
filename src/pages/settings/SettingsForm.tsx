import {useState} from 'react';
import {Panel,QueryState} from '@/components/ui/Page';
import {Input} from '@/components/ui/Input';
import {Select} from '@/components/ui/Select';
import {Button} from '@/components/ui/Button';
import {useSession} from '@/hooks/useSession';
import {useQuery} from '@/hooks/useQuery';
import {useNotifications} from '@/hooks/useNotifications';
import {delay} from '@/services/store';
export interface SettingField{key:string;label:string;type?:string;options?:string[];description?:string;required?:boolean}
export function SettingsForm({page,title,description,fields,initial={}}:{page:string;title:string;description:string;fields:SettingField[];initial?:Record<string,string|boolean>}){
 const {user,organisation}=useSession(),key='nexus_settings_'+organisation?.id+'_'+user?.id+'_'+page;
 const query=useQuery(async()=>{await delay();try{return {...initial,...JSON.parse(localStorage.getItem(key)||'{}')} as Record<string,string|boolean>;}catch{return initial;}},key);
 return <Panel title={title} description={description}><QueryState query={query}>{query.data&&<SettingsFields key={key} fields={fields} initial={query.data} storageKey={key}/>}</QueryState></Panel>;
}
function SettingsFields({fields,initial,storageKey}:{fields:SettingField[];initial:Record<string,string|boolean>;storageKey:string}){
 const [values,setValues]=useState(initial),[busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState(false),{toast}=useNotifications();
 return <form onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{await delay();if(values.newPassword&&String(values.newPassword).length<8)throw new Error('Use at least 8 characters for the new password.');if(values.newPassword!==values.confirmPassword)throw new Error('The new passwords do not match.');localStorage.setItem(storageKey,JSON.stringify(Object.fromEntries(Object.entries(values).filter(([key])=>!key.toLowerCase().includes('password')))));setValues(v=>Object.fromEntries(Object.entries(v).map(([key,value])=>[key,key.toLowerCase().includes('password')?'':value])));setSaved(true);toast('Preferences saved for this demo');}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><div className="panel-body stack">{fields.map(f=>f.type==='toggle'?<label className="setting-row" key={f.key}><span><strong>{f.label}</strong><p>{f.description}</p></span><input className="switch" type="checkbox" checked={values[f.key]===true} disabled={busy} onChange={e=>{setSaved(false);setValues({...values,[f.key]:e.target.checked});}}/></label>:<div key={f.key}>{f.options?<Select label={f.label} options={f.options.map(v=>({value:v,label:v}))} value={String(values[f.key]||f.options[0])} onChange={e=>{setSaved(false);setValues({...values,[f.key]:e.target.value});}} disabled={busy}/>:<Input label={f.label} type={f.type||'text'} value={String(values[f.key]||'')} required={f.required} minLength={f.type==='password'?8:undefined} autoComplete={f.type==='password'?'new-password':undefined} disabled={busy} onChange={e=>{setSaved(false);setValues({...values,[f.key]:e.target.value});}}/>}{f.description&&<p className="field-help">{f.description}</p>}</div>)}{error&&<p className="form-error" role="alert">{error}</p>}{saved&&<p role="status" className="notice success">Saved locally. Settings and password changes are simulated in this frontend demo.</p>}<div><Button type="submit" disabled={busy}>{busy?'Saving…':'Save changes'}</Button></div></div></form>;
}

