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

export const log_event = async ({ event_log }) => {
  const { error } = await supabase.insert('events', {
    event_log,
    wallet_identifier: wallet.accountId,
  });

  if (error) {
    console.log('Error occured in event log', error);
    throw new Error(error?.message);
  }
};

export const isNumber = (value) => {
  return typeof value === 'number';
};

export const insertUserData = async (dataToInsert) => {
  const { data } = await supabase.select('users', {
    wallet_identifier: wallet.accountId,
  });
  if (!data?.[0]) {
    await supabase.insert('users', {
      ...dataToInsert,
      wallet_identifier: wallet.accountId,
    });
  } else {
    await supabase.update('users', dataToInsert, {
      wallet_identifier: wallet.accountId,
    });
  }
};

export const formatNumberWithComma = (number) => {
  let nf = new Intl.NumberFormat('en-US');
  return nf.format(number);
};

export const deleteUserDataFromSupabase = async () => {
  // delete all rows with particular wallet id from events and users table
  await supabase.delete('users', {
    wallet_identifier: wallet.accountId,
  });
  await supabase.delete('events', {
    wallet_identifier: wallet.accountId,
  });
};
