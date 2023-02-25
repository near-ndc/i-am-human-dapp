export const defaultEnv = process.env.NEAR_ENV || 'testnet';

export default function getConfig(env = defaultEnv) {
  switch (env) {
    case 'mainnet':
      return {
        API_URL: '',
        CONTRACT_ID: ''
      };
    case 'testnet':
      return {
        API_URL: 'http://localhost:3001',
        CONTRACT_ID: 'gooddollar-v1.i-am-human.testnet'
      };
    default:
      return {
        API_URL: 'http://localhost:3001',
        CONTRACT_ID: 'gooddollar-v1.i-am-human.testnet'
      };
  }
}
