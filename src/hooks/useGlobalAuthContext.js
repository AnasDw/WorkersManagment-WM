import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

export const useGlobalAuthContext = () => useContext(AuthContext);
