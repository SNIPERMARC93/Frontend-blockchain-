import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronDown,ChevronRight,Folder,Laptop,FileBadge} from 'lucide-react';
import type {AssetCategory} from '@/types';
import {Button} from '@/components/ui/Button';
export function AssetNode({category,categories,selected}:{category:AssetCategory;categories:AssetCategory[];selected:string}){const [open,setOpen]=useState(true),children=categories.filter(c=>c.parentId===category.id),Icon=category.parentId?Folder:category.type==='Physical'?Laptop:FileBadge;const to=category.parentId?'/assets/category/'+category.id:'/assets/'+category.id;return <li><div className={'tree-row '+(selected===category.id?'selected':'')}>{children.length>0?<Button variant="ghost" aria-label={(open?'Collapse ':'Expand ')+category.name} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<ChevronDown size={13}/>:<ChevronRight size={13}/>}</Button>:<span style={{width:24}}/>}<Link to={to} aria-current={selected===category.id?'page':undefined}><Icon size={15}/>{category.name}</Link></div>{open&&children.length>0&&<ul>{children.map(c=><AssetNode key={c.id} category={c} categories={categories} selected={selected}/>)}</ul>}</li>;}

