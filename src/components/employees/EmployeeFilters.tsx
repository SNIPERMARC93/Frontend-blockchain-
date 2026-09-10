import type {EmployeeQuery} from '@/types';
import {Input} from '@/components/ui/Input';
import {Select,type Option} from '@/components/ui/Select';
import {Button} from '@/components/ui/Button';
export function EmployeeFilters({query,onChange,units,roles}:{query:EmployeeQuery;onChange:(query:EmployeeQuery)=>void;units:Option[];roles:Option[]}){return <div className="filters"><Input label="Search employees" placeholder="Name, email or employee ID…" value={query.search||''} onChange={e=>onChange({...query,search:e.target.value})}/><Select label="Organisation unit" placeholder="All units" options={units} value={query.unitId||''} onChange={e=>onChange({...query,unitId:e.target.value})}/><Select label="Role" placeholder="All roles" options={roles} value={query.role||''} onChange={e=>onChange({...query,role:e.target.value})}/><Select label="Status" placeholder="All statuses" options={['Active','Inactive'].map(v=>({value:v,label:v}))} value={query.status||''} onChange={e=>onChange({...query,status:e.target.value})}/><div className="filter-actions"><Button variant="ghost" onClick={()=>onChange({})}>Clear</Button></div></div>;}

