import {useState} from 'react';
import type {OrganisationUnit} from '@/types';
import {buildTree} from '@/utils/buildTree';
import {OrganisationNode} from './OrganisationNode';
import {Input} from '@/components/ui/Input';
export function OrganisationTree({units,selected,onAction,canManage}:{units:OrganisationUnit[];selected:string;onAction:(action:'add'|'edit'|'delete',id:string)=>void;canManage:(id:string)=>boolean}){const [search,setSearch]=useState('');return <><div className="tree-search"><Input label="Find an organisation unit" placeholder="Search units…" value={search} onChange={e=>setSearch(e.target.value)}/></div><nav className="tree" aria-label="Organisation hierarchy"><ul>{buildTree(units).map(node=><OrganisationNode key={node.id} node={node} selected={selected} search={search} onAction={onAction} canManage={canManage}/>)}</ul>{!units.some(u=>u.name.toLowerCase().includes(search.toLowerCase()))&&<p className="subtle">No matching units.</p>}</nav></>;}

