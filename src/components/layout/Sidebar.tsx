import {NavLink} from 'react-router-dom';
import {Layers,LayoutDashboard,Network,Users,ShieldCheck,Package,Laptop,FileBadge,History,ScanLine,Settings,LogOut,X,ChevronDown} from 'lucide-react';
import {useSession} from '@/hooks/useSession';
import {can} from '@/utils/permissions';
import {initials} from '@/utils/formatDate';
import type {Resource} from '@/types';
import {Button} from '@/components/ui/Button';
const navigation=[
 {section:'MAIN',links:[{name:'Dashboard',to:'/dashboard',icon:LayoutDashboard}]},
 {section:'ORGANISATION',links:[{name:'Organisation',to:'/organisation',icon:Network,resource:'organisation'}]},
 {section:'MANAGEMENT',links:[{name:'Employees',to:'/employees',icon:Users,resource:'employees'},{name:'Roles & Permissions',to:'/roles',icon:ShieldCheck,resource:'roles'}]},
 {section:'ASSETS',links:[{name:'All Assets',to:'/assets',icon:Package,resource:'assets',end:true},{name:'Physical Assets',to:'/assets/physical',icon:Laptop,resource:'assets'},{name:'Digital Assets',to:'/assets/digital',icon:FileBadge,resource:'assets'}]},
 {section:'VERIFICATION',links:[{name:'Audit History',to:'/audit',icon:History,resource:'audit'},{name:'Verification',to:'/verification',icon:ScanLine,resource:'verification'}]},
 {section:'SETTINGS',links:[{name:'Settings',to:'/settings',icon:Settings}]},
];
export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){const {user,organisation,permissions,logout}=useSession();return <><button type="button" aria-label="Close navigation" className={'sidebar-backdrop '+(open?'visible':'')} onClick={onClose}/><aside id="workspace-navigation" role={open?'dialog':undefined} aria-modal={open||undefined} aria-label="Workspace navigation" className={'sidebar '+(open?'open':'')}><div className="sidebar-brand"><NavLink to="/dashboard" aria-label="NEXUS ID" className="brand"><Layers size={27}/><span>NEXUS<span className="brand-light"> ID</span></span></NavLink><Button className="mobile-only" variant="ghost" aria-label="Close navigation" onClick={onClose}><X size={20}/></Button></div><div className="org-switch"><span className="org-icon">{initials(organisation?.name||'ACME')}</span><div><strong>{organisation?.name}</strong><small>Organisation workspace</small></div><ChevronDown size={15}/></div><nav className="sidebar-nav" aria-label="Workspace navigation">{navigation.map(group=>{const links=group.links.filter(link=>!('resource'in link)||can(permissions,link.resource as Resource));return links.length?<div className="nav-group" key={group.section}><p>{group.section}</p>{links.map(link=><NavLink key={link.name} aria-label={link.name} title={link.name} end={'end'in link?Boolean(link.end):false} to={link.to} onClick={onClose}><link.icon size={18}/><span>{link.name}</span></NavLink>)}</div>:null;})}</nav><div className="sidebar-bottom"><div className="environment"><span/> Demo workspace</div><div className="sidebar-user"><span className="avatar">{initials(user?.name||'U')}</span><div><strong>{user?.name}</strong><small>{user?.designation}</small></div><Button variant="ghost" aria-label="Sign out" onClick={logout}><LogOut size={17}/></Button></div></div></aside></>;}


