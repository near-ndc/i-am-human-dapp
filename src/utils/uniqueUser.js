import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

export const useUniqueGUser = ({ gAddress }) => {
  const [isExistingGUser, setIsExistingGUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserFromDB = useCallback(async (address) => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .match({ g$_address: address });
      console.log(data);
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
  const { data } = await supabase
    .from("users")
    .select("*")
    .match({ telegram_number: no });
  if (data?.[0]) {
    return true;
  } else {
    return false;
  }
};
