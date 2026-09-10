import type {ReactNode} from 'react';
export function Badge({children}:{children:ReactNode}){const text=String(children);const tone=/^(Verified|Active|Success|Available|success)$/.test(text)?'success':/Pending|Maintenance|warning|partial/.test(text)?'warning':/Failed|Revoked|Inactive|failed|error/.test(text)?'error':'neutral';return <span className={'badge badge-'+tone}><span className="badge-dot"/>{children}</span>;}

