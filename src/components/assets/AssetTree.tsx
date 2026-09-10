import {Link} from 'react-router-dom';
import {Package} from 'lucide-react';
import type {AssetCategory} from '@/types';
import {AssetNode} from './AssetNode';
export function AssetTree({categories,selected}:{categories:AssetCategory[];selected:string}){return <nav className="tree" aria-label="Asset categories"><div className={'tree-row '+(!selected?'selected':'')}><Link to="/assets" style={{paddingLeft:12}}><Package size={17}/>All assets</Link></div><ul>{categories.filter(c=>!c.parentId).map(c=><AssetNode key={c.id} category={c} categories={categories} selected={selected}/>)}</ul></nav>;}

