import {Link} from 'react-router-dom';
import type {Employee} from '@/types';
import {initials} from '@/utils/formatDate';
import {Badge} from '@/components/ui/Badge';
export function EmployeeCard({employee}:{employee:Employee}){return <Link className="asset-card" to={'/employees/'+employee.id}><span className="avatar">{initials(employee.name)}</span><h3>{employee.name}</h3><p className="subtle">{employee.designation}</p><Badge>{employee.status}</Badge></Link>;}

