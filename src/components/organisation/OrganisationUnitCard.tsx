import {Link} from 'react-router-dom';
import {Folder,ArrowUpRight} from 'lucide-react';
import type {OrganisationUnit} from '@/types';
export function OrganisationUnitCard({unit}:{unit:OrganisationUnit}){return <Link className="asset-card" to={'/organisation/'+unit.id}><div className="inline between"><Folder size={22}/><ArrowUpRight size={16}/></div><h3>{unit.name}</h3><p>{unit.type}</p><p className="subtle">{unit.employeeCount} employees · {unit.assetCount} assets</p></Link>;}

