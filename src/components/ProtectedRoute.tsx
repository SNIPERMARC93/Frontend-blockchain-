import {Navigate,Outlet,useLocation} from 'react-router-dom';
import type {Resource,Action} from '@/types';
import {useSession} from '@/hooks/useSession';
import {can} from '@/utils/permissions';
import {LoadingState} from './ui/LoadingState';
import AccessDenied from '@/pages/errors/AccessDenied';
export function ProtectedRoute({resource,action='view',onboarding=false}:{resource?:Resource;action?:Action;onboarding?:boolean}){
 const session=useSession(),location=useLocation();
 if(session.isLoading)return <LoadingState/>;
 if(!session.isAuthenticated)return <Navigate to="/login" state={{from:location.pathname+location.search}} replace/>;
 if(!onboarding&&!session.organisation)return <Navigate to="/onboarding/create-organisation" replace/>;
 if(onboarding&&session.organisation)return <Navigate to="/dashboard" replace/>;
 if(resource&&!can(session.permissions,resource,action))return <AccessDenied/>;
 return <Outlet/>;
}

