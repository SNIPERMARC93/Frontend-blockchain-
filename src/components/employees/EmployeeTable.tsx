import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {Eye,Pencil,Trash2} from 'lucide-react';
import type {Employee} from '@/types';
import {Table} from '@/components/ui/Table';
import {Badge} from '@/components/ui/Badge';
import {Button} from '@/components/ui/Button';
import {EmptyState} from '@/components/ui/EmptyState';
import {initials} from '@/utils/formatDate';
export function EmployeeTable({employees,units={},roles={},onEdit,onDelete,emptyAction}:{employees:Employee[];units?:Record<string,string>;roles?:Record<string,string>;onEdit?:(e:Employee)=>void;onDelete?:(e:Employee)=>void;emptyAction?:ReactNode}){return <Table rows={employees} caption="Employees" empty={<EmptyState title="No employees found" description="Add an employee, import a file, or adjust your filters." action={emptyAction}/>} columns={[{key:'id',title:'Employee ID',render:e=><span className="mono">{e.employeeId}</span>},{key:'name',title:'Name',render:e=><Link className="person-cell" to={'/employees/'+e.id}><span className="avatar small">{initials(e.name)}</span><div><strong>{e.name}</strong><small>{e.designation}</small></div></Link>},{key:'email',title:'Email',render:e=>e.email},{key:'unit',title:'Unit',render:e=><Link to={'/organisation/'+e.organisationUnitId}>{units[e.organisationUnitId]||e.organisationUnitId}</Link>},{key:'role',title:'Role',render:e=>roles[e.role]||e.role},{key:'status',title:'Status',render:e=><Badge>{e.status}</Badge>},{key:'actions',title:'Actions',render:e=><div className="row-actions"><Link className="btn btn-ghost" aria-label={'View '+e.name} to={'/employees/'+e.id}><Eye size={15}/></Link>{onEdit&&<Button variant="ghost" aria-label={'Edit '+e.name} onClick={()=>onEdit(e)}><Pencil size={14}/></Button>}{onDelete&&<Button variant="ghost" aria-label={'Delete '+e.name} onClick={()=>onDelete(e)}><Trash2 size={14}/></Button>}</div>}]}/>;}

