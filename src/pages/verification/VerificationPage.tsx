import {useState} from 'react';
import {ShieldCheck} from 'lucide-react';
import type {VerificationResultData} from '@/types';
import {PageHeading,Panel,Tabs} from '@/components/ui/Page';
import {VerificationForm} from '@/components/verification/VerificationForm';
export default function VerificationPage(){const [tab,setTab]=useState<VerificationResultData['kind']>('Identity');return <><PageHeading eyebrow="TRUST & VERIFICATION" title="Verification center" description="Check an identity, confirm asset records, or review an authorisation."/><div className="trust-strip"><div className="inline"><ShieldCheck size={23}/><p>Verification uses local demo records. Results do not represent a live external verification.</p></div></div><Panel title="Verify a record" description="Choose the type of record you want to check"><div className="panel-body"><Tabs tabs={['Identity','Asset','Authorization']} active={tab} onChange={t=>setTab(t as VerificationResultData['kind'])}/><div style={{maxWidth:720}}><VerificationForm key={tab} kind={tab}/></div></div></Panel></>;}

