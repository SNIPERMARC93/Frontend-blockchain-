import {useEffect,useRef,useState,useCallback} from 'react';
export function useQuery<T>(loader:()=>Promise<T>,key=''){
 const ref=useRef(loader);ref.current=loader;
 const [revision,setRevision]=useState(0),[state,setState]=useState<{data:T|null;loading:boolean;error:string|null}>({data:null,loading:true,error:null});
 const retry=useCallback(()=>setRevision(r=>r+1),[]);
 useEffect(()=>{window.addEventListener('nexus:data',retry);return()=>window.removeEventListener('nexus:data',retry);},[retry]);
 useEffect(()=>{let live=true;setState(s=>({...s,loading:true,error:null}));ref.current().then(data=>{if(live)setState({data,loading:false,error:null});}).catch(e=>{if(live)setState({data:null,loading:false,error:e instanceof Error?e.message:'Unable to load records.'});});return()=>{live=false;};},[key,revision]);
 return {...state,retry};
}

