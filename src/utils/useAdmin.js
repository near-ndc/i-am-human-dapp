import { useState, useEffect, useCallback } from 'react';
import { checkAdmin } from './utilityFunctions';

export const useAdmin = ({ address }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  const checkAdminStatus = useCallback(async () => {
    if (address) {
      try {
        const data = await checkAdmin(address);
        if (data) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
    }
  }, [address]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);
  return [isAdmin];
};
