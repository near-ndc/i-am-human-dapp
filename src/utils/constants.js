import moment from 'moment';

export const TWITTER_TEXT = process.env.REACT_APP_TWITTER_TEXT; // using env so that marketing team is able to change it frequently

export const TWITTER_URL = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}`;

export const LSKeys = {
  SHOW_SBT_PAGE: 'showSuccessSBTPage',
  TRANSFER_ADDR: 'Transfer Address',
};

// used in supabase column type for date
export const convertToTimestamptz = (timestamp) => {
  return moment.utc(timestamp).format('YYYY-MM-DDTHH:mm:ssZ');
};

export function hasTwoDots(str) {
  const regex = /\.\.*\./;
  return regex.test(str);
}

export const URLs = {
  SCOREBOARD: '/community-scoreboard',
  SBTs: '/community-sbts',
  HOME: '/',
  APPLICATION: '/community-application',
};

export function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('ascii');
}

export const TokenTypes = {
  KYC: 'KYC',
  OG: 'OG',
  FV: 'FV',
  VIBE: 'Vibe',
  REGEN: 'Regen',
};

export const ReducerNames = {
  ORACLE: 'Oracle',
  SBT: 'SBT',
  COMMON: 'Common',
  PROGRESS: 'Progress Tracker',
};

export const ContractMethodNames = {
  BURN: 'sbt_burn_all',
  TRANSFER: 'sbt_soul_transfer',
};

export const BrandColor = '#9333EA';
