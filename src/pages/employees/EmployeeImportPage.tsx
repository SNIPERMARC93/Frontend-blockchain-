import {Link} from 'react-router-dom';
import {PageHeading} from '@/components/ui/Page';
import {EmployeeImport} from '@/components/employees/EmployeeImport';
export default function EmployeeImportPage(){return <><PageHeading eyebrow="PEOPLE MANAGEMENT" title="Import employees" description="Add your team in one upload. Review every row before importing." actions={<Link to="/employees" className="btn btn-outline">Back to employees</Link>}/><EmployeeImport/></>;}

