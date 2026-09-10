import {useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import {useSession} from '@/hooks/useSession';
import {AuthLayout} from '@/components/layout/AuthLayout';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
export default function Signup(){const {signup,isAuthenticated}=useSession(),[name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');if(isAuthenticated)return <Navigate to="/onboarding/create-organisation" replace/>;
 return <AuthLayout><p className="eyebrow">GET STARTED</p><h2>Create your account</h2><p className="subtle">Set up your profile, then create or join an organisation.</p><form className="stack" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await signup(name,email,password);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><Input label="Full name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required/><Input label="Work email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required/><Input label="Password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/><small className="subtle">Use at least 8 characters. Demo passwords are not stored.</small>{error&&<p className="form-error" role="alert">{error}</p>}<Button type="submit" disabled={busy}>{busy?'Creating account…':'Create account'}</Button></form><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></AuthLayout>;
}

