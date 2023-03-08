import { wallet } from "../index";
import { supabase } from "./supabase";

export const checkAdmin = (walletAddress) => {
  return wallet.viewMethod({
    contractId: "og-sbt.i-am-human.near",
    method: "is_admin",
    args: { addr: walletAddress },
  });
};

export const log_event = async ({ event_log, effected_wallet }) => {
  const additional_data = effected_wallet ? { effected_wallet } : {};
  const { error } = await supabase.from("events").insert({
    event_log,
    wallet_identifier: wallet.accountId,
    ...additional_data
  });
  if (error) {
    throw new Error(error?.message);
  }
};
