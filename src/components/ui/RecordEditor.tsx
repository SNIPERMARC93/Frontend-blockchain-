import {useState} from 'react';
import {Modal} from './Modal';
import {Button} from './Button';
import {Input} from './Input';
import {Select,type Option} from './Select';
export interface EditorField {key:string;label:string;type?:string;options?:Option[];required?:boolean;help?:string;disabled?:boolean}
export function RecordEditor({title,fields,initial={},onSave,onClose,submitLabel='Save changes'}:{title:string;fields:EditorField[];initial?:Record<string,string>;onSave:(values:Record<string,string>)=>Promise<unknown>;onClose:()=>void;submitLabel?:string}){
 const [values,setValues]=useState(initial),[busy,setBusy]=useState(false),[error,setError]=useState('');
 return <Modal title={title} onClose={onClose} busy={busy}><form onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{await onSave(values);onClose();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><div className="modal-body form-grid">{fields.map(f=><div key={f.key}>{f.options?<Select label={f.label} options={f.options} placeholder="Select…" required={f.required} disabled={busy||f.disabled} value={values[f.key]||''} onChange={e=>setValues({...values,[f.key]:e.target.value})}/>:<Input label={f.label} type={f.type||'text'} required={f.required} disabled={busy||f.disabled} value={values[f.key]||''} onChange={e=>setValues({...values,[f.key]:e.target.value})}/>} {f.help&&<p className="field-help">{f.help}</p>}</div>)}{error&&<p className="form-error span-all" role="alert">{error}</p>}</div><div className="modal-footer"><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button type="submit" disabled={busy}>{busy?'Saving…':submitLabel}</Button></div></form></Modal>;
}
export function ConfirmDialog({title,message,onConfirm,onClose,label='Confirm',destructive=false}:{title:string;message:string;onConfirm:()=>Promise<unknown>;onClose:()=>void;label?:string;destructive?:boolean}){
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 return <Modal title={title} onClose={onClose} busy={busy}><div className="modal-body"><p>{message}</p>{error&&<p role="alert" className="form-error">{error}</p>}</div><div className="modal-footer"><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button variant={destructive?'destructive':'default'} disabled={busy} onClick={async()=>{setBusy(true);try{await onConfirm();onClose();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}>{busy?'Please wait…':label}</Button></div></Modal>;
}

