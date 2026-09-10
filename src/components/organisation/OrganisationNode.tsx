import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronRight,ChevronDown,Folder,MoreHorizontal} from 'lucide-react';
import type {TreeNode} from '@/types';
import {Button} from '@/components/ui/Button';
export function OrganisationNode({node,selected,search,onAction,canManage}:{node:TreeNode;selected:string;search:string;onAction:(action:'add'|'edit'|'delete',id:string)=>void;canManage:(id:string)=>boolean}){
 const [open,setOpen]=useState(node.depth<2);const matches=(n:TreeNode):boolean=>n.name.toLowerCase().includes(search.toLowerCase())||n.children.some(matches);if(search&&!matches(node))return null;
 const expanded=open||!!search;
 return <li><div className={'tree-row '+(node.id===selected?'selected':'')}><Button variant="ghost" aria-label={(expanded?'Collapse ':'Expand ')+node.name} aria-expanded={node.children.length?expanded:undefined} disabled={!node.children.length} onClick={()=>setOpen(!open)}>{expanded?<ChevronDown size={13}/>:<ChevronRight size={13}/>}</Button><Link to={'/organisation/'+node.id} aria-current={node.id===selected?'page':undefined}><Folder size={14}/><span>{node.name}</span><small title={node.employeeCount+' employees, '+node.assetCount+' assets'}>{node.employeeCount} · {node.assetCount}</small></Link>{canManage(node.id)&&<details className="tree-menu"><summary aria-label={'Actions for '+node.name}><MoreHorizontal size={16}/></summary><div>{(['add','edit','delete'] as const).map(a=><button key={a} type="button" onClick={e=>{e.currentTarget.closest('details')?.removeAttribute('open');onAction(a,node.id);}}>{a==='add'?'Add child unit':a==='edit'?'Edit unit':'Delete unit'}</button>)}</div></details>}</div>{expanded&&node.children.length>0&&<ul>{node.children.map(child=><OrganisationNode key={child.id} node={child} selected={selected} search={search} onAction={onAction} canManage={canManage}/>)}</ul>}</li>;
}

