import {useContext} from 'react';
import {NotificationContext} from '@/contexts/NotificationContext';
export function useNotifications(){const value=useContext(NotificationContext);if(!value)throw new Error('useNotifications requires NotificationProvider');return value;}

