import {useEffect,useRef,useId,type ReactNode} from 'react';
import {X} from 'lucide-react';
import {Button} from './Button';
export function Modal({title,children,onClose,busy=false,wide=false}:{title:string;children:ReactNode;onClose:()=>void;busy?:boolean;wide?:boolean}){
 const ref=useRef<HTMLDialogElement>(null),id=useId();
 useEffect(()=>{const dialog=ref.current!;const previous=document.activeElement as HTMLElement;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus();};},[]);
 return <dialog ref={ref} aria-labelledby={id} className={'modal '+(wide?'modal-wide':'')} onCancel={e=>{e.preventDefault();if(!busy)onClose();}}><div className="modal-heading"><h2 id={id}>{title}</h2><Button variant="ghost" aria-label="Close dialog" disabled={busy} onClick={onClose}><X size={18}/></Button></div>{children}</dialog>;
}

