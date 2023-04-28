export const defaultEnv = process.env.NEAR_ENV || 'testnet';

export default function getConfig(env = defaultEnv) {
  switch (env) {
    case 'mainnet':
      return {
        API_URL: 'https://back.justfortestinc.site',
      };
    case 'testnet':
      return {
        API_URL: 'https://back.justfortestinc.site',
      };
    default:
      return {
        API_URL: 'https://back.justfortestinc.site',
      };
  }
}
