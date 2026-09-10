import {lazy,Suspense} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {AuthProvider} from '@/contexts/AuthContext';
import {NotificationProvider} from '@/contexts/NotificationContext';
import {ProtectedRoute} from '@/components/ProtectedRoute';
import {AppShell} from '@/components/layout/AppShell';
import {Toast} from '@/components/ui/Toast';
import {LoadingState} from '@/components/ui/LoadingState';
import {useSession} from '@/hooks/useSession';
import {can} from '@/utils/permissions';
import {AppErrorBoundary} from '@/components/AppErrorBoundary';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import CreateOrganisation from '@/pages/onboarding/CreateOrganisation';
import JoinOrganisation from '@/pages/onboarding/JoinOrganisation';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import EmployeeDashboard from '@/pages/dashboard/EmployeeDashboard';
import NotFound from '@/pages/errors/NotFound';
import AccessDenied from '@/pages/errors/AccessDenied';
import SettingsLayout from '@/pages/settings/SettingsLayout';
import OrgSettings from '@/pages/settings/OrgSettings';
import UsersSettings from '@/pages/settings/UsersSettings';
import RolesSettings from '@/pages/settings/RolesSettings';
import AssetsSettings from '@/pages/settings/AssetsSettings';
import IdentitySettings from '@/pages/settings/IdentitySettings';
import IntegrationsSettings from '@/pages/settings/IntegrationsSettings';
import SecuritySettings from '@/pages/settings/SecuritySettings';
import NotificationsSettings from '@/pages/settings/NotificationsSettings';
import AccountSettings from '@/pages/settings/AccountSettings';
import './workspace.css';
const Landing=lazy(()=>import('@/pages/Landing'));
const OrganisationPage=lazy(()=>import('@/pages/organisation/OrganisationPage'));
const OrganisationUnitPage=lazy(()=>import('@/pages/organisation/OrganisationUnitPage'));
const EmployeesPage=lazy(()=>import('@/pages/employees/EmployeesPage'));
const EmployeeProfilePage=lazy(()=>import('@/pages/employees/EmployeeProfilePage'));
const EmployeeImportPage=lazy(()=>import('@/pages/employees/EmployeeImportPage'));
const AssetsPage=lazy(()=>import('@/pages/assets/AssetsPage'));
const AssetDetailPage=lazy(()=>import('@/pages/assets/AssetDetailPage'));
const AssetCategoryPage=lazy(()=>import('@/pages/assets/AssetCategoryPage'));
const RolesPage=lazy(()=>import('@/pages/roles/RolesPage'));
const RoleDetailPage=lazy(()=>import('@/pages/roles/RoleDetailPage'));
const AuditPage=lazy(()=>import('@/pages/audit/AuditPage'));
const VerificationPage=lazy(()=>import('@/pages/verification/VerificationPage'));
function Dashboard(){const {permissions}=useSession();if(!can(permissions,'employees')||!can(permissions,'assets'))return <AccessDenied/>;return can(permissions,'audit')?<AdminDashboard/>:<EmployeeDashboard/>;}
function SettingsIndex(){const {permissions}=useSession();return <Navigate to={can(permissions,'settings','manage')?'organisation':'account'} replace/>;}
export default function App(){return <AppErrorBoundary><BrowserRouter><AuthProvider><NotificationProvider><Suspense fallback={<LoadingState/>}><Routes>
  <Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/>
  <Route element={<ProtectedRoute onboarding/>}><Route path="/onboarding/create-organisation" element={<CreateOrganisation/>}/><Route path="/onboarding/join-organisation" element={<JoinOrganisation/>}/></Route>
  <Route element={<ProtectedRoute/>}><Route element={<AppShell/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route element={<ProtectedRoute resource="organisation"/>}><Route path="/organisation" element={<OrganisationPage/>}/><Route path="/organisation/:unitId" element={<OrganisationUnitPage/>}/></Route>
    <Route element={<ProtectedRoute resource="employees"/>}><Route path="/employees" element={<EmployeesPage/>}/><Route path="/employees/:employeeId" element={<EmployeeProfilePage/>}/></Route>
    <Route element={<ProtectedRoute resource="employees" action="manage"/>}><Route path="/employees/import" element={<EmployeeImportPage/>}/></Route>
    <Route element={<ProtectedRoute resource="assets"/>}><Route path="/assets" element={<AssetsPage/>}/><Route path="/assets/physical" element={<AssetsPage/>}/><Route path="/assets/digital" element={<AssetsPage/>}/><Route path="/assets/category/:categoryId" element={<AssetCategoryPage/>}/><Route path="/assets/:assetId" element={<AssetDetailPage/>}/></Route>
    <Route element={<ProtectedRoute resource="roles"/>}><Route path="/roles" element={<RolesPage/>}/><Route path="/roles/:roleId" element={<RoleDetailPage/>}/></Route>
    <Route element={<ProtectedRoute resource="audit"/>}><Route path="/audit" element={<AuditPage/>}/></Route>
    <Route element={<ProtectedRoute resource="verification"/>}><Route path="/verification" element={<VerificationPage/>}/></Route>
    <Route path="/settings" element={<SettingsLayout/>}><Route index element={<SettingsIndex/>}/><Route path="account" element={<AccountSettings/>}/><Route path="notifications" element={<NotificationsSettings/>}/>
      <Route element={<ProtectedRoute resource="settings" action="manage"/>}><Route path="organisation" element={<OrgSettings/>}/><Route path="users" element={<UsersSettings/>}/><Route path="structure" element={<RolesSettings/>}/><Route path="roles" element={<Navigate to="/roles" replace/>}/><Route path="assets" element={<AssetsSettings/>}/><Route path="identity" element={<IdentitySettings/>}/><Route path="integrations" element={<IntegrationsSettings/>}/><Route path="security" element={<SecuritySettings/>}/></Route>
      <Route path="*" element={<NotFound/>}/>
    </Route>
    <Route path="/access-denied" element={<AccessDenied/>}/>
  </Route></Route>
  <Route path="/onboarding" element={<Navigate to="/onboarding/create-organisation" replace/>}/><Route path="/org/create" element={<Navigate to="/onboarding/create-organisation" replace/>}/><Route path="/org/join" element={<Navigate to="/onboarding/join-organisation" replace/>}/><Route path="*" element={<NotFound/>}/>
</Routes></Suspense><Toast/></NotificationProvider></AuthProvider></BrowserRouter></AppErrorBoundary>;}
