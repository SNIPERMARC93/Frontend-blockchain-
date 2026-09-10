import {useContext} from 'react';
import {AuthContext} from '@/contexts/AuthContext';
export function useSession(){const value=useContext(AuthContext);if(!value)throw new Error('useSession requires AuthProvider');return value;}

