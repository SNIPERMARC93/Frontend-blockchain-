import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSession} from '@/hooks/useSession';
import {AuthLayout} from '@/components/layout/AuthLayout';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
export default function CreateOrganisation(){const {createOrganisation,logout}=useSession(),[name,setName]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[review,setReview]=useState(false);
 return <AuthLayout><p className="eyebrow">SET UP YOUR WORKSPACE · {review?'2':'1'} OF 2</p><h2>{review?'Ready to get started?':'Create an organisation'}</h2><p className="subtle">You’ll be the administrator of your new workspace.</p><form className="stack" onSubmit={async e=>{e.preventDefault();if(!review){setReview(true);return;}setBusy(true);try{await createOrganisation(name);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}>{review?<div className="notice"><strong>{name}</strong><p>Your workspace starts with a headquarters unit and your administrator profile.</p></div>:<Input label="Organisation name" value={name} onChange={e=>setName(e.target.value)} required maxLength={100}/>} {error&&<p className="form-error" role="alert">{error}</p>}<div className="inline">{review&&<Button variant="outline" disabled={busy} onClick={()=>setReview(false)}>Back</Button>}<Button type="submit" disabled={busy}>{busy?'Creating workspace…':review?'Create workspace':'Continue'}</Button></div></form><p className="auth-switch">Have an invitation? <Link to="/onboarding/join-organisation">Join an organisation</Link></p><Button variant="ghost" onClick={logout}>Sign out</Button></AuthLayout>;
}

