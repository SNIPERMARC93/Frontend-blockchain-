import { useId, type SelectHTMLAttributes } from 'react';
export interface Option {value:string;label:string}
export function Select({label,options,placeholder,id,...props}:SelectHTMLAttributes<HTMLSelectElement>&{label:string;options:Option[];placeholder?:string}){const generated=useId();return <label className="field" htmlFor={id||generated}><span>{label}</span><select id={id||generated} {...props}>{placeholder!==undefined&&<option value="">{placeholder}</option>}{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;}

