import {ShieldX} from 'lucide-react';
import {Link} from 'react-router-dom';
export default function AccessDenied(){return <div className="empty-state error-page"><ShieldX size={42}/><p className="eyebrow">403 · Access denied</p><h1>This page needs additional access</h1><p>Your current role does not include permission to view this page.</p><Link className="btn btn-default" to="/dashboard">Back to dashboard</Link></div>;}

