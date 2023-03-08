import { wallet } from "../index";
import { supabase } from "./supabase";

export const checkAdmin = (walletAddress) => {
  return wallet.viewMethod({
    contractId: "og-sbt.i-am-human.near",
    method: "is_admin",
    args: { addr: walletAddress },
  });
};

export const log_event = async ({ event_log }) => {
  const { error } = await supabase.from("events").insert({
    event_log,
    wallet_identifier: wallet.accountId,
  });
  if (error) {
    throw new Error(error?.message);
  }
};
