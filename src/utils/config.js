const environment = process.env.REACT_APP_ENV ?? 'prod';

export function getConfig() {
  const commonConfig = {
    gooddollar_api: 'https://back.justfortestinc.site',
    mintFee: '8000000000000000000000',
  };
  switch (environment) {
    case 'prod':
      return {
        network_id: 'mainnet',
        app_contract: 'registry.i-am-human.near',
        og_contract: 'og-sbt.i-am-human.near',
        gooddollar_contract: 'gooddollar-v1.i-am-human.near',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        api_link: 'https://api-ophc7vkxsq-uc.a.run.app',
        ...commonConfig,
      };
    case 'dev':
      return {
        network_id: 'testnet',
        app_contract: 'registry-1.i-am-human.testnet',
        og_contract: 'og-sbt-1.i-am-human.testnet',
        gooddollar_contract: 'gooddollar-v1.i-am-human.testnet',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        api_link: 'https://dev-ophc7vkxsq-uc.a.run.app/',
        ...commonConfig,
      };
    default:
      throw new Error(`${environment} is not a valid NEAR environment`);
  }
}
