// TODO: replace mock operations with authenticated API requests to /api/identities.
import { getDB, delay, clone } from './store';
import { requireRecord, demandEmployee } from './access';
export const IdentityService={async getByEmployeeId(employeeId:string){await delay();demandEmployee(requireRecord(getDB().employees.find(e=>e.id===employeeId&&!e.deletedAt),'Employee'));return clone(requireRecord(getDB().identities.find(i=>i.employeeId===employeeId),'Identity'));}};

