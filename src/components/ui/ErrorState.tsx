import {AlertCircle} from 'lucide-react';
import {Button} from './Button';
export function ErrorState({message,retry}:{message:string;retry:()=>void}){return <div className="empty-state" role="alert"><AlertCircle className="error-text" size={28}/><h3>Unable to load this view</h3><p>{message}</p><Button variant="outline" onClick={retry}>Retry</Button></div>;}

