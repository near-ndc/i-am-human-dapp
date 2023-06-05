import { useState, useEffect, useCallback } from 'react';
import { checkAdmin } from '../utils/common';

export const useAdmin = ({ address }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  const checkAdminStatus = useCallback(async () => {
    if (address) {
      try {
        const data = await checkAdmin(address);
        setIsAdmin(!!data);
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
