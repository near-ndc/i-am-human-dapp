import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { api_link } from "./supabase";
import { wallet } from "../index";

export const super_admins = [
  "harrydhillon.near",
  "kazanderdad.near",
  "blaze.near",
];

export const useSuperAdmin = () => {
  const [isSuperAdmin, setSuperAdmin] = useState(false);

  const fetchAdminStatus = useCallback(async () => {
    const superadmin = await axios.post(`${api_link}/is_admin`, {
      wallet: wallet.accountId,
    });
    setSuperAdmin(superadmin.data.is_super_admin);
  }, []);

  useEffect(() => {
    fetchAdminStatus();
  }, [fetchAdminStatus]);

  return { isSuperAdmin };
};
