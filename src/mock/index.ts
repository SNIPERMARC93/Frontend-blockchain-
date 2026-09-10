import type { Database } from '@/types';
import { organisation, units } from './organisation';
import { employees, identities } from './employees';
import { assets, assignments, categories } from './assets';
import { roles } from './roles';
import { audit } from './audit';
export function createSeed(): Database { return structuredClone({organisations:[organisation],activeOrganisationId:organisation.id,units,employees,identities,assets,assignments,categories,roles,audit}); }

