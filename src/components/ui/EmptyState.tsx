import {Inbox} from 'lucide-react';
import type {ReactNode} from 'react';
export function EmptyState({title='No matching records',description='Try another search or clear your filters.',action}:{title?:string;description?:string;action?:ReactNode}){return <div className="empty-state"><span className="empty-icon"><Inbox size={25}/></span><h3>{title}</h3><p>{description}</p>{action}</div>;}

