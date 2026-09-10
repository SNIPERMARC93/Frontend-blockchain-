import {useQuery} from './useQuery';
import {OrganisationService} from '@/services/OrganisationService';
export function useOrganisation(){return useQuery(()=>OrganisationService.list());}

