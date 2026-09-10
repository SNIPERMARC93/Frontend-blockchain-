import {useFilterParams} from '@/hooks/useFilterParams';
import {useState} from 'react';
import {useLocation,useParams} from 'react-router-dom';
import {Plus} from 'lucide-react';
import type {AssetQuery} from '@/types';
import {useQuery} from '@/hooks/useQuery';
import {useSession} from '@/hooks/useSession';
import {AssetService} from '@/services/AssetService';
import {ReferenceService} from '@/services/ReferenceService';
import {AssetTree} from '@/components/assets/AssetTree';
import {AssetTable} from '@/components/assets/AssetTable';
import {AssetEditor} from '@/components/assets/AssetEditor';
import {PageHeading,Panel,QueryState} from '@/components/ui/Page';
import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';
import {Select} from '@/components/ui/Select';
import {can} from '@/utils/permissions';
export default function AssetsPage(){
 const location=useLocation(),{categoryId}=useParams(),[params,setParams]=useFilterParams(),[adding,setAdding]=useState(false),{permissions}=useSession();
 const type=location.pathname==='/assets/physical'?'Physical':location.pathname==='/assets/digital'?'Digital':params.get('type')||'';
 const filters:AssetQuery={type,category:categoryId||params.get('category')||'',status:params.get('status')||'',unitId:params.get('unitId')||'',assigneeId:params.get('assigneeId')||'',search:params.get('search')||''};
 const query=useQuery(async()=>{const [assets,refs]=await Promise.all([AssetService.list(filters),ReferenceService.list()]);if(categoryId&&!refs.categories.some(c=>c.id===categoryId))throw new Error('Asset category not found.');return {assets,refs};},JSON.stringify(filters));
 const d=query.data,manage=can(permissions,'assets','manage'),title=categoryId?d?.refs.categories.find(c=>c.id===categoryId)?.name||'Asset category':type?type+' assets':'All assets';
 const change=(key:string,value:string)=>{const p=new URLSearchParams(params);if(value)p.set(key,value);else p.delete(key);setParams(p,{replace:true});};
 const visible=d?.assets.filter(a=>(!params.has('verification')||a.blockchainStatus!=='Verified')&&(!params.has('expiring')||!!a.expiresAt&&new Date(a.expiresAt).getTime()>Date.now()&&new Date(a.expiresAt).getTime()-Date.now()<30*86400000))||[];
 return <><PageHeading eyebrow="ASSET MANAGEMENT" title={title} description="Keep track of every asset, its owner and its history." actions={manage?<Button onClick={()=>setAdding(true)}><Plus size={16}/>Register asset</Button>:undefined}/><div className="split-layout"><Panel title="Asset directory" description="Physical and digital resources"><AssetTree categories={d?.refs.categories||[]} selected={categoryId||type.toLowerCase()}/></Panel><Panel><div className="filters"><Input label="Search assets" placeholder="Name, ID or serial number…" value={filters.search} onChange={e=>change('search',e.target.value)}/><Select label="Type" placeholder="All types" disabled={location.pathname!=='/assets'} options={['Physical','Digital'].map(v=>({value:v,label:v}))} value={type} onChange={e=>change('type',e.target.value)}/><Select label="Category" placeholder="All categories" disabled={!!categoryId} options={d?.refs.categories.filter(c=>c.parentId&&(!type||c.type===type)).map(c=>({value:c.id,label:c.name}))||[]} value={filters.category} onChange={e=>change('category',e.target.value)}/><Select label="Status" placeholder="All statuses" options={['Assigned','Available','In Maintenance','Returned'].map(v=>({value:v,label:v}))} value={filters.status} onChange={e=>change('status',e.target.value)}/><Select label="Assignee" placeholder="All assignees" options={d?.refs.employees.filter(e=>!e.deletedAt).map(e=>({value:e.id,label:e.name}))||[]} value={filters.assigneeId} onChange={e=>change('assigneeId',e.target.value)}/><Select label="Unit" placeholder="All units" options={d?.refs.units.map(u=>({value:u.id,label:u.name}))||[]} value={filters.unitId} onChange={e=>change('unitId',e.target.value)}/><div className="filter-actions"><Button variant="ghost" onClick={()=>setParams({})}>Clear</Button></div></div>{(params.has('verification')||params.has('expiring'))&&<p className="panel-body subtle">{params.has('verification')?'Showing assets awaiting verification.':'Showing licenses expiring within 30 days.'}</p>}<QueryState query={query}>{d&&<AssetTable assets={visible} units={Object.fromEntries(d.refs.units.map(u=>[u.id,u.name]))} employees={Object.fromEntries(d.refs.employees.map(e=>[e.id,e.name]))} emptyAction={manage?<Button onClick={()=>setAdding(true)}>Register your first asset</Button>:undefined}/>}</QueryState></Panel></div>{adding&&<AssetEditor onClose={()=>setAdding(false)}/>}</>;
}

