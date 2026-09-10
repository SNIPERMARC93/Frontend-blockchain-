import {CheckCircle2,AlertCircle,X} from 'lucide-react';
import {useNotifications} from '@/hooks/useNotifications';
export function Toast(){const {toasts,dismissToast}=useNotifications();return <div className="toast-stack" aria-live="polite" aria-atomic="false">{toasts.map(t=><div key={t.id} className={'toast toast-'+t.type} role={t.type==='error'?'alert':'status'}>{t.type==='error'?<AlertCircle size={20}/>:<CheckCircle2 size={20}/>}<span>{t.message}</span><button type="button" aria-label="Dismiss notification" onClick={()=>dismissToast(t.id)}><X size={16}/></button></div>)}</div>;}

