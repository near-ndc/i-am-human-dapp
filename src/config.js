export const defaultEnv = process.env.NEAR_ENV || 'testnet';

export default function getConfig(env = defaultEnv) {
  switch (env) {
    case 'mainnet':
      return {
        network: 'mainnet',
        API_URL: 'https://back.justfortestinc.site',
        CONTRACT_ID: 'gooddollar-v1.i-am-human.near'
      };
    case 'testnet':
      return {
        network: 'mainnet',
        API_URL: 'https://back.justfortestinc.site',
        CONTRACT_ID: 'gooddollar-v1.i-am-human.near'
      };
    default:
      return {
        network: 'testnet',
        API_URL: 'https://back.justfortestinc.site',
        CONTRACT_ID: 'gooddollar-v1.i-am-human.near'
      };
  }
}