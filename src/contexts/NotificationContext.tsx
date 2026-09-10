import {createContext,useCallback,useEffect,useRef,useState,type ReactNode} from 'react';
import type {Notification,ToastMessage} from '@/types';
import {useSession} from '@/hooks/useSession';
import {newId} from '@/services/store';
interface Value {notifications:Notification[];unreadCount:number;markRead:(id:string)=>void;markAllRead:()=>void;addNotification:(n:Omit<Notification,'id'|'read'|'createdAt'>)=>void;toast:(message:string,type?:Notification['type'])=>void;toasts:ToastMessage[];dismissToast:(id:string)=>void}
export const NotificationContext=createContext<Value|null>(null);
export function NotificationProvider({children}:{children:ReactNode}){
 const {user,organisation}=useSession(),key='nexus_notifications_'+organisation?.id+'_'+user?.id;
 const [notifications,setNotifications]=useState<Notification[]>([]),[toasts,setToasts]=useState<ToastMessage[]>([]);const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
 useEffect(()=>{try{setNotifications(JSON.parse(localStorage.getItem(key)||'[]'));}catch{setNotifications([]);}setToasts([]);},[key]);
 const update=useCallback((fn:(items:Notification[])=>Notification[])=>setNotifications(items=>{const next=fn(items);localStorage.setItem(key,JSON.stringify(next));return next;}),[key]);
 const addNotification=useCallback((n:Omit<Notification,'id'|'read'|'createdAt'>)=>update(items=>[{...n,id:newId('N'),read:false,createdAt:new Date().toISOString()},...items].slice(0,60)),[update]);
 useEffect(()=>{if(!user||!organisation)return;const handle=(event:Event)=>addNotification((event as CustomEvent).detail);window.addEventListener('nexus:notification',handle);return()=>window.removeEventListener('nexus:notification',handle);},[user?.id,organisation?.id,addNotification]);
 const dismissToast=useCallback((id:string)=>setToasts(items=>items.filter(t=>t.id!==id)),[]);
 const toast=useCallback((message:string,type:Notification['type']='success')=>{const id=newId('T');setToasts(items=>[...items,{id,message,type}]);timers.current.push(setTimeout(()=>dismissToast(id),4000));},[dismissToast]);
 useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
 return <NotificationContext.Provider value={{notifications,unreadCount:notifications.filter(n=>!n.read).length,markRead:id=>update(items=>items.map(n=>n.id===id?{...n,read:true}:n)),markAllRead:()=>update(items=>items.map(n=>({...n,read:true}))),addNotification,toast,toasts,dismissToast}}>{children}</NotificationContext.Provider>;
}

