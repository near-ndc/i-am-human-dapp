import moment from 'moment';

export const TWITTER_TEXT = process.env.REACT_APP_TWITTER_TEXT; // using env so that marketing team is able to change it frequently

export const TWITTER_URL = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}`;

export const LSKeys = {
  SHOW_SBT_PAGE: 'showSuccessSBTPage',
};

// used in supabase column type for date
export const convertToTimestamptz = (timestamp) => {
  return moment.utc(timestamp).format('YYYY-MM-DDTHH:mm:ssZ');
};
