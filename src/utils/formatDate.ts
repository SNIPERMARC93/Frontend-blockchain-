export function formatDate(value: string | null | undefined, time = false) { if(!value)return '—';const date=new Date(value);return Number.isNaN(date.getTime())?'—':new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric',...(time?{hour:'2-digit',minute:'2-digit'} as const:{})}).format(date); }
export const initials=(name:string)=>name.split(' ').map(n=>n[0]).slice(0,2).join('');

