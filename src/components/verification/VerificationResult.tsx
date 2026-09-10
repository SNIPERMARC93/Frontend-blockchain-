import type {ReactNode} from 'react';
import {CheckCircle2,XCircle} from 'lucide-react';
import type {VerificationResultData} from '@/types';
import {Details} from '@/components/ui/Page';
import {formatDate} from '@/utils/formatDate';
import {Badge} from '@/components/ui/Badge';
export function VerificationResult({result}:{result:VerificationResultData}){const Icon=result.verified?CheckCircle2:XCircle;return <section className="result-card" role="status" style={!result.verified?{borderColor:'#f8717140',background:'#f8717107'}:undefined}><div className="inline" style={{marginBottom:23}}><Icon size={26} color={result.verified?'#4ade80':'#fca5a5'}/><div><h3 style={{margin:0}}>{result.verified?'Verified':'Not verified'}</h3><p className="subtle">{result.message}</p></div></div><Details items={[[result.kind,result.name],['Record ID',result.id],['Current record',result.record],...(result.kind==='Asset'?[['Blockchain Record',<Badge>{result.verified?'Valid':'Not verified'}</Badge>]] as [string,ReactNode][]:[]),['Transaction Reference',<span className="mono">{result.transactionRef}</span>],['Checked at',formatDate(result.checkedAt,true)]]}/><p className="subtle" style={{fontSize:10,marginTop:20}}>Simulated verification result from local demo records.</p></section>;}

