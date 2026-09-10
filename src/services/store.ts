import type { Database, Employee, Organisation, SessionRecord } from '@/types';
import { createSeed } from '@/mock';
const KEY='nexus_data_v1';
export const SESSION_KEY='nexus_session_v1';
export function storedSession(): SessionRecord | null { try {const s=JSON.parse(localStorage.getItem(SESSION_KEY)||'null') as SessionRecord|null;return s?.userId&&s.expiresAt>Date.now()?s:null;}catch{return null;} }
function restore(): Record<string, Database> { try {const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved?.org1?.employees&&saved.org1.roles)return saved;}catch{/* A malformed demo store is recoverable. */}return {org1:createSeed()}; }
let databases=restore();
export function getDB(): Database { return databases[storedSession()?.organisationId||'org1']||databases.org1; }
export function allDatabases(){return Object.values(databases);}
export function getActor(): Employee {const actor=getDB().employees.find(e=>e.id===storedSession()?.userId&&!e.deletedAt);if(!actor)throw new Error('Your session has expired. Please sign in again.');return actor;}
export function persist(){localStorage.setItem(KEY,JSON.stringify(databases));window.dispatchEvent(new Event('nexus:data'));}
export function transaction<T>(action:()=>T):T {const before=structuredClone(databases);try{const result=action();persist();return result;}catch(error){databases=before;throw error;}}
export const newId=(prefix:string)=>prefix+'-'+crypto.randomUUID().slice(0,8);
export const delay=(ms=400)=>new Promise<void>((resolve,reject)=>setTimeout(()=>navigator.onLine===false?reject(new Error('You are offline. Reconnect and try again.')):resolve(),ms));
export const clone=<T,>(value:T):T=>structuredClone(value);
export function auditEvent(action:string,entity:Database['audit'][number]['entity'],entityId:string,metadata:Record<string,string>={},status:Database['audit'][number]['status']='Success'){
 const event={id:newId('AU'),actorId:getActor().id,action,entity,entityId,metadata,status,createdAt:new Date().toISOString()};
 getDB().audit.unshift(event);window.dispatchEvent(new CustomEvent('nexus:notification',{detail:{type:status==='Failed'?'error':'success',title:action,message:metadata.name||entityId,link:entity==='Asset'?'/assets/'+entityId:entity==='Employee'?'/employees/'+entityId:entity==='Role'?'/roles/'+entityId:'/organisation/'+entityId}}));
}
export function createWorkspace(name:string,user:Employee):Organisation {
 const org:Organisation={id:newId('ORG'),name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),createdAt:new Date().toISOString(),rootUnitId:newId('UNIT')};
 const seed=createSeed();databases[org.id]={...seed,organisations:[org],activeOrganisationId:org.id,units:[{id:org.rootUnitId,name:name+' HQ',type:'Headquarters',parentId:null,managerId:user.id,employeeCount:1,assetCount:0,depth:0}],employees:[{...user,role:'admin',organisationUnitId:org.rootUnitId,managerId:null}],assets:[],assignments:[],audit:[],identities:[{id:newId('I'),employeeId:user.id,did:'did:example:'+org.id+':'+user.id,status:'Pending',verifiedAt:null}]};persist();return org;
}
export function joinWorkspace(user:Employee){const db=databases.org1;const existing=db.employees.find(e=>e.email.toLowerCase()===user.email.toLowerCase()&&!e.deletedAt);if(existing)return existing;const e={...user,role:'employee',organisationUnitId:'hq',managerId:'E001'};db.employees.push(e);db.identities.push({id:newId('I'),employeeId:e.id,did:'did:example:acme:'+e.id,status:'Pending',verifiedAt:null});persist();return e;}

