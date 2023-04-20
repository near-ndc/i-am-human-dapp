export function getEnv(env = process.env.REACT_APP_ENV) {
  switch (env) {
    case 'prod':
      return {
        networkId: 'mainnet',
        app_contract: 'registry.i-am-human.near',
        og_contract: 'og-sbt.i-am-human.near',
        gooddollar_contract: 'gooddollar-v1.i-am-human.near',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        apiLink: 'https://api-ophc7vkxsq-uc.a.run.app',
      };
    case 'dev':
      return {
        networkId: 'testnet',
        app_contract: 'registry-1.i-am-human.testnet',
        og_contract: 'og-sbt-1.i-am-human.testnet',
        gooddollar_contract: 'gooddollar-v1.i-am-human.testnet',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        apiLink: 'https://dev-ophc7vkxsq-uc.a.run.app',
      };
    default:
      throw new Error(`${env} is not a valid NEAR environment`);
  }
}
