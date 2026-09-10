import {useQuery} from './useQuery';
import {ReferenceService} from '@/services/ReferenceService';
export function useReferences(){return useQuery(()=>ReferenceService.list());}

