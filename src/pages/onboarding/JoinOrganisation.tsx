import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSession} from '@/hooks/useSession';
import {AuthLayout} from '@/components/layout/AuthLayout';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
export default function JoinOrganisation(){const {joinOrganisation}=useSession(),[code,setCode]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');return <AuthLayout><p className="eyebrow">JOIN YOUR TEAM</p><h2>Join an organisation</h2><p className="subtle">Enter the invitation code from your administrator.</p><form className="stack" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await joinOrganisation(code);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><Input label="Invitation code" value={code} onChange={e=>setCode(e.target.value)} placeholder="ACME-2026" required/><div className="notice">Use <strong>ACME-2026</strong> to join the demo organisation as an employee.</div>{error&&<p className="form-error" role="alert">{error}</p>}<Button type="submit" disabled={busy}>{busy?'Joining…':'Join organisation'}</Button></form><p className="auth-switch"><Link to="/onboarding/create-organisation">Create a new organisation instead</Link></p></AuthLayout>;}

