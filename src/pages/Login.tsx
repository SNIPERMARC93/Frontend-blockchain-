import {useState} from 'react';
import {Link,Navigate,useLocation} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {useSession} from '@/hooks/useSession';
import {AuthLayout} from '@/components/layout/AuthLayout';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
export default function Login(){const {login,isAuthenticated,isLoading}=useSession(),location=useLocation();const[email,setEmail]=useState('ananya.sharma@acme.example'),[password,setPassword]=useState('demo1234'),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const from=typeof location.state?.from==='string'&&location.state.from.startsWith('/')&&!location.state.from.startsWith('//')?location.state.from:'/dashboard';
 if(!isLoading&&isAuthenticated)return <Navigate to={from} replace/>;
 return <AuthLayout><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your workspace</h2><p className="subtle">Your people, permissions and assets. All in one place.</p><form className="stack" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{await login(email,password);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><Input label="Work email" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/><Input label="Password" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/>{error&&<p role="alert" className="form-error">{error}</p>}<Button type="submit" disabled={busy}>{busy?'Signing in…':'Sign in'}<ArrowRight size={17}/></Button></form><div className="demo-accounts"><p>Explore a demo role</p><div className="inline wrap">{[['Admin','ananya.sharma'],['Manager','vikram.rao'],['Auditor','maya.iyer'],['Employee','aarav.shah']].map(([name,email])=><Button key={name} variant="outline" onClick={()=>setEmail(email+'@acme.example')}>{name}</Button>)}</div><small>Any password works. An unrecognised email opens the admin demo.</small></div><p className="auth-switch">New to Nexus ID? <Link to="/signup">Create an account</Link></p></AuthLayout>;
}

