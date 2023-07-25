export const TWITTER_TEXT = process.env.REACT_APP_TWITTER_TEXT; // using env so that marketing team is able to change it frequently

export const TWITTER_URL = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}`;

export const LSKeys = {
  SHOW_SBT_PAGE: 'showSuccessSBTPage',
  TRANSFER_ADDR: 'Transfer Address',
};

export const URLs = {
  SCOREBOARD: '/community-scoreboard',
  SBTs: '/community-sbts',
  HOME: '/',
};

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

export const CommunityDataKeys = {
  COMMUNITY_NAME: 'community-name',
  COMMUNITY_VERTICAL: 'community-vertical',
};
