import {SearchX} from 'lucide-react';
import {Link} from 'react-router-dom';
export default function NotFound(){return <div className="empty-state error-page"><SearchX size={42}/><p className="eyebrow">404 · Page not found</p><h1>We couldn’t find that page</h1><p>The address may have changed. Your workspace is still here.</p><Link className="btn btn-default" to="/dashboard">Back to dashboard</Link></div>;}

