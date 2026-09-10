import {createContext,useCallback,useEffect,useMemo,useState,type ReactNode} from 'react';
import type {Employee,Organisation,Role,Permission,SessionRecord} from '@/types';
import {allDatabases,createWorkspace,delay,getDB,joinWorkspace,newId,SESSION_KEY,storedSession} from '@/services/store';
interface AuthValue {user:Employee|null;organisation:Organisation|null;role:Role|null;permissions:Permission[];isAuthenticated:boolean;isLoading:boolean;login:(email:string,password:string)=>Promise<void>;signup:(name:string,email:string,password:string)=>Promise<void>;logout:()=>void;createOrganisation:(name:string)=>Promise<void>;joinOrganisation:(code:string)=>Promise<void>}
export const AuthContext=createContext<AuthValue|null>(null);
export function AuthProvider({children}:{children:ReactNode}){
 const [session,setSession]=useState<SessionRecord|null>(null),[isLoading,setLoading]=useState(true),[revision,setRevision]=useState(0);
 const save=useCallback((record:SessionRecord|null)=>{if(record)localStorage.setItem(SESSION_KEY,JSON.stringify(record));else localStorage.removeItem(SESSION_KEY);setSession(record);},[]);
 const logout=useCallback(()=>save(null),[save]);
 useEffect(()=>{save(storedSession());setLoading(false);},[save]);
 useEffect(()=>{const refresh=()=>setRevision(r=>r+1);window.addEventListener('nexus:data',refresh);const sync=()=>save(storedSession());window.addEventListener('storage',sync);return()=>{window.removeEventListener('nexus:data',refresh);window.removeEventListener('storage',sync);};},[save]);
 useEffect(()=>{if(!session)return;const timer=setTimeout(logout,Math.max(0,session.expiresAt-Date.now()));return()=>clearTimeout(timer);},[session,logout]);
 const user=useMemo(()=>session?(session.organisationId?getDB().employees.find(e=>e.id===session.userId&&!e.deletedAt)||null:session.pendingUser||null):null,[session,revision]);
 const organisation=session?.organisationId?getDB().organisations.find(o=>o.id===session.organisationId)||null:null;
 const role=user&&organisation?getDB().roles.find(r=>r.id===user.role)||null:null;
 const makeSession=(user:Employee,organisationId:string|null):SessionRecord=>({userId:user.id,organisationId,mockToken:'mock-session-'+newId('S'),expiresAt:Date.now()+8*60*60*1000,...(!organisationId?{pendingUser:user}:{})});
 async function login(email:string,password:string){if(!email.trim()||!password)throw new Error('Enter your email and password.');await delay(800);const databases=allDatabases();const db=databases.find(d=>d.employees.some(e=>!e.deletedAt&&e.email.toLowerCase()===email.trim().toLowerCase()))||databases.find(d=>d.activeOrganisationId==='org1')!;const employee=db.employees.find(e=>!e.deletedAt&&e.email.toLowerCase()===email.trim().toLowerCase())||db.employees.find(e=>e.id==='E001')!;save(makeSession(employee,db.activeOrganisationId));}
 async function signup(name:string,email:string,password:string){await delay(800);if(!name.trim()||!email.trim()||password.length<8)throw new Error('Enter your name, email and a password of at least 8 characters.');if(allDatabases().some(d=>d.employees.some(e=>!e.deletedAt&&e.email.toLowerCase()===email.toLowerCase())))throw new Error('This email is already registered. Sign in instead.');const id=newId('E'),employee:Employee={id,employeeId:id,name:name.trim(),email:email.trim(),designation:'Team member',organisationUnitId:'',managerId:null,role:'employee',status:'Active',identityStatus:'Pending',createdAt:new Date().toISOString()};save(makeSession(employee,null));}
 async function createOrganisation(name:string){await delay();if(!user)throw new Error('Please sign in first.');if(!name.trim())throw new Error('Enter an organisation name.');const org=createWorkspace(name.trim(),user);save(makeSession(user,org.id));}
 async function joinOrganisation(code:string){await delay();if(!user)throw new Error('Please sign in first.');if(code.trim().toUpperCase()!=='ACME-2026')throw new Error('Invitation code not found. Use ACME-2026 for the demo organisation.');const employee=joinWorkspace(user);save(makeSession(employee,'org1'));}
 return <AuthContext.Provider value={{user,organisation,role,permissions:role?.permissions||[],isAuthenticated:!!user,isLoading,login,signup,logout,createOrganisation,joinOrganisation}}>{children}</AuthContext.Provider>;
}

