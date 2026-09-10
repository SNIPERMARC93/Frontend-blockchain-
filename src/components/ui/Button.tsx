import type { ButtonHTMLAttributes } from 'react';
export function Button({variant='default',className='',type='button',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'default'|'outline'|'ghost'|'destructive'|'secondary';size?:string}){return <button type={type} className={'btn btn-'+variant+' '+className} {...props}/>;}
