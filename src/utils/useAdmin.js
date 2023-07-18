import { useState, useEffect, useCallback } from 'react';
import { checkAdmin } from './utilityFunctions';
import { wallet } from '..';
import { useDispatch } from 'react-redux';
import { updateAdminLogin } from '../redux/reducer/commonReducer';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const dispatch = useDispatch();
  const checkAdminStatus = useCallback(async () => {
    if (wallet.accountId) {
      try {
        const data = await checkAdmin(wallet.accountId);
        if (data) {
          dispatch(updateAdminLogin(true));
        } else {
          dispatch(updateAdminLogin(false));
        }
      } catch {
        dispatch(updateAdminLogin(false));
      }
    }
  }, [wallet.accountId]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  return [isAdmin];
};
