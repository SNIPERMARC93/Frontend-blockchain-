import type {ReactNode} from 'react';
import {Skeleton} from './Skeleton';
import {ErrorState} from './ErrorState';
export function PageHeading({eyebrow,title,description,actions}:{eyebrow?:string;title:string;description?:string;actions?:ReactNode}){return <div className="page-heading"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description&&<p className="subtle">{description}</p>}</div>{actions&&<div className="inline wrap">{actions}</div>}</div>;}
export function Panel({title,description,actions,children,className=''}:{title?:string;description?:string;actions?:ReactNode;children:ReactNode;className?:string}){return <section className={'panel '+className}>{title&&<div className="panel-heading"><div><h2>{title}</h2>{description&&<p>{description}</p>}</div>{actions}</div>}{children}</section>;}
export function QueryState({query,children}:{query:{loading:boolean;error:string|null;retry:()=>void};children:ReactNode}){return query.loading?<Skeleton/>:query.error?<ErrorState message={query.error} retry={query.retry}/>:<>{children}</>;}
export function Details({items}:{items:[string,ReactNode][]}){return <dl className="details">{items.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value ?? '—'}</dd></div>)}</dl>;}
export function Tabs({tabs,active,onChange}:{tabs:string[];active:string;onChange:(tab:string)=>void}){return <div className="tabs" aria-label="Sections">{tabs.map(t=><button key={t} type="button" className={active===t?'active':''} aria-pressed={active===t} onClick={()=>onChange(t)}>{t}</button>)}</div>;}

