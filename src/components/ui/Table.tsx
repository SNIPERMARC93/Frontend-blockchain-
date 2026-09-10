import {useState,type ReactNode} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {Button} from './Button';
import {EmptyState} from './EmptyState';
export interface Column<T>{key:string;title:string;render:(row:T)=>ReactNode}
export function Table<T extends {id:string}>({rows,columns,empty,caption='Records',pageSize=8}:{rows:T[];columns:Column<T>[];empty?:ReactNode;caption?:string;pageSize?:number}){
 const [page,setPage]=useState(0);const pages=Math.max(1,Math.ceil(rows.length/pageSize));const current=Math.min(page,pages-1);
 if(!rows.length)return empty||<EmptyState/>;
 return <><div className="table-scroll" tabIndex={0} role="region" aria-label={caption}><table><caption className="sr-only">{caption}</caption><thead><tr>{columns.map(c=><th key={c.key} scope="col">{c.title}</th>)}</tr></thead><tbody>{rows.slice(current*pageSize,(current+1)*pageSize).map(row=><tr key={row.id}>{columns.map(c=><td key={c.key}>{c.render(row)}</td>)}</tr>)}</tbody></table></div><div className="table-footer"><span>Showing {current*pageSize+1}–{Math.min((current+1)*pageSize,rows.length)} of {rows.length}</span><div className="inline"><Button variant="ghost" aria-label="Previous page" disabled={current===0} onClick={()=>setPage(current-1)}><ChevronLeft size={16}/></Button><span>{current+1} / {pages}</span><Button variant="ghost" aria-label="Next page" disabled={current===pages-1} onClick={()=>setPage(current+1)}><ChevronRight size={16}/></Button></div></div></>;
}

