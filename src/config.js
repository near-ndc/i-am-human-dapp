export const defaultEnv = process.env.NEAR_ENV || 'testnet';

export default function getConfig(env = defaultEnv) {
  return {
    API_URL: 'https://back.justfortestinc.site',
  };
}
