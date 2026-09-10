import {Fragment} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {ChevronRight} from 'lucide-react';
export function Breadcrumbs(){const {pathname}=useLocation(),parts=pathname.split('/').filter(Boolean);return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/dashboard">Workspace</Link>{parts.map((part,i)=><Fragment key={i}><ChevronRight size={13}/>{i===parts.length-1?<span aria-current="page">{decodeURIComponent(part).replace(/-/g,' ')}</span>:<Link to={'/'+parts.slice(0,i+1).join('/')}>{part.replace(/-/g,' ')}</Link>}</Fragment>)}</nav>;}

