import type { Asset, AssetAssignment, AssetCategory } from '@/types';
import { employees } from './employees';
export const categories: AssetCategory[] = [
 {id:'physical',name:'Physical Assets',parentId:null,type:'Physical'}, {id:'laptops',name:'Laptops',parentId:'physical',type:'Physical'},
 {id:'mobiles',name:'Mobile Devices',parentId:'physical',type:'Physical'}, {id:'vehicles',name:'Vehicles',parentId:'physical',type:'Physical'},
 {id:'digital',name:'Digital Assets',parentId:null,type:'Digital'}, {id:'software',name:'Software Licenses',parentId:'digital',type:'Digital'},
 {id:'certificates',name:'Certificates',parentId:'digital',type:'Digital'},
];
const names = ['MacBook Pro 14″','Dell Latitude 7450','Lenovo ThinkPad X1','MacBook Air M3','HP EliteBook 840','Dell XPS 15','MacBook Pro 16″','ThinkPad T14','iPhone 15','Samsung Galaxy S24','Google Pixel 9','iPhone 16','Toyota Innova','Tata Nexon EV','Figma Professional','Adobe Creative Cloud','Microsoft 365','GitHub Enterprise','JetBrains All Products','Slack Business+','Domain SSL Certificate','Code Signing Certificate','ISO 27001 Certificate','Microsoft 365 — Finance'];
export const assets: Asset[] = names.map((name,i) => {
 const category = i<8?'laptops':i<12?'mobiles':i<14?'vehicles':i<20?'software':i<23?'certificates':'software';
 const assignee = i<12?employees[[4,7,9,8,10,15,5,16,1,2,3,13][i]]:null;
 return {id:'A'+String(i+1).padStart(3,'0'),assetId:(category==='laptops'?'L':category==='mobiles'?'M':category==='vehicles'?'V':category==='software'?'S':'C')+String(i+1).padStart(3,'0'),name,type:i<14?'Physical':'Digital',category,subCategory:i<14?'Company equipment':'Business subscription',serialNumber:'ACME-2026-'+String(i+1).padStart(4,'0'),condition:i===13?'Needs repair':i%4===0?'Good':'Excellent',status:assignee?'Assigned':i===13?'In Maintenance':i===20?'Returned':'Available',locationId:i<14?'Bengaluru HQ':'Online',organisationUnitId:assignee?.organisationUnitId ?? (i%2?'finance':'infra'),currentAssigneeId:assignee?.id??null,blockchainStatus:i%5===0?'Pending':i%7===0?'Unregistered':'Verified',tokenId:null,createdAt:'2026-06-01T09:00:00Z',...(i>=14?{expiresAt:i===14?'2026-09-20':'2027-06-01'}:{})};
});
export const assignments: AssetAssignment[] = [
 {id:'AS001',assetId:'A001',assigneeId:'E008',assignedById:'E002',assignedAt:'2026-06-02T09:00:00Z',returnedAt:'2026-07-01T09:00:00Z',reason:'Initial equipment allocation',status:'Transferred',transactionRef:'TX-DEMO-0001'},
 ...assets.filter(a=>a.currentAssigneeId).map((a,i):AssetAssignment=>({id:'AS'+String(i+2).padStart(3,'0'),assetId:a.id,assigneeId:a.currentAssigneeId!,assignedById:'E001',assignedAt:'2026-07-01T09:00:00Z',returnedAt:null,reason:i===0?'Lead workstation upgrade':'Employee equipment allocation',status:'Active',transactionRef:'TX-DEMO-'+String(i+2).padStart(4,'0')})),
 {id:'AS014',assetId:'A021',assigneeId:'E011',assignedById:'E002',assignedAt:'2026-06-03T09:00:00Z',returnedAt:'2026-08-01T09:00:00Z',reason:'Certificate renewal',status:'Returned',transactionRef:'TX-DEMO-0014'},
];

