import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';

export const useUniqueGUser = ({ gAddress }) => {
  const [isExistingGUser, setIsExistingGUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserFromDB = useCallback(async (address) => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const { data } = await supabase.select('users', { g$_address: address });
=======
      const { data } = await supabase.select("users", { g$_address: address });
>>>>>>> 48966249772b5aa83c9c64693200e4f44c160f97
      if (data?.[0]) {
        setIsExistingGUser(true);
      } else {
        setIsExistingGUser(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (gAddress) {
      fetchUserFromDB(gAddress);
    }
  }, [gAddress, fetchUserFromDB]);
  return { isExistingGUser, loading };
};

export const checkUniquePhone = async ({ no }) => {
  const { data } = await supabase.select('users', { telegram_number: no });
  if (data?.[0]) {
    return true;
  } else {
    return false;
  }
};
