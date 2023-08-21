import axios from 'axios';
import { wallet } from '../index';
import { getConfig } from './config';
import { api_link, supabase } from './supabase';
import moment from 'moment';

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
  await supabase.delete('scoreboard', {
    account: wallet.accountId,
  });
};

export function decodeBase64(str) {
  return JSON.parse(Buffer.from(str, 'base64').toString('ascii'));
}

// used in supabase column type for date
export const convertToTimestamptz = (timestamp) => {
  return moment.utc(timestamp).format('YYYY-MM-DDTHH:mm:ssZ');
};

export function hasTwoDots(str) {
  const regex = /\.\.*\./;
  return regex.test(str);
}

export const addIPAddr = async (visitorID) => {
  const table = 'users';
  const match = {
    wallet_identifier: wallet.accountId,
  };
  const body = {
    fingerprint_visitor_id: visitorID,
  };
  // delete all rows with particular wallet id from events and users table
  await axios.post(`${api_link}/storeIP`, { table, body, match });
};
