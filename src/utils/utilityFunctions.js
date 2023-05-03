import { wallet } from '../index';
import { getConfig } from './config';
import { supabase } from './supabase';

export const checkAdmin = (walletAddress) => {
  return wallet.viewMethod({
    contractId: getConfig().og_contract,
    method: 'is_admin',
    args: { addr: walletAddress },
  });
};

export const log_event = async ({ event_log, effected_wallet }) => {
  const additional_data = effected_wallet ? { effected_wallet } : {};
  const { error } = await supabase.insert('events', {
    event_log,
    wallet_identifier: wallet.accountId,
    ...additional_data,
  });

  if (error) {
    throw new Error(error?.message);
  }
};
