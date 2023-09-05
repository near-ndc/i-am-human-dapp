const environment = process.env.REACT_APP_ENV ?? 'prod';

export function getConfig() {
  const commonConfig = {
    succes_fractal_state: 'facescan',
    regen_issuer_contract: 'issuer.regens.near',
    vibe_issuer_contract: 'issuer.proofofvibes.near',
    mods_issuer: 'gwg.sputnik-dao.near',
    election_contract: 'elections.ndc-gwg.near',
  };
  switch (environment) {
    case 'prod':
      return {
        network_id: 'mainnet',
        app_contract: 'registry.i-am-human.near',
        og_contract: 'community.i-am-human.near',
        fractal_contract: 'fractal.i-am-human.near',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        api_link: 'https://api-ophc7vkxsq-uc.a.run.app',
        fractal_api: 'https://back.justfortestinc.site',
        fractal_link: 'https://app.fractal.id',
        fractal_client_id: '6l6ze953tTjsog6VjZaCsCJ8LgiL_UqySA-E2f3ljPw',
        kudos_issuer_contract: 'kudos.ndctools.near',
        ...commonConfig,
      };
    case 'dev':
      return {
        network_id: 'testnet',
        app_contract: 'registry-1.i-am-human.testnet',
        og_contract: 'community-v1.i-am-human.testnet',
        // fractal_contract: 'fractal-1.i-am-human.testnet', // for DEV ENV
        fractal_contract: 'i-am-human-staging.testnet',
        new_sbt_contract: 'sbt1.i-am-human.testnet',
        api_link: 'https://dev-ophc7vkxsq-uc.a.run.app',
        fractal_api: 'https://staging.justfortestinc.site',
        fractal_link: 'https://app.next.fractal.id',
        fractal_client_id: 'D6SgXZQdWYk0D8ILkIGpNK75ufFpxD0Mp9sHFb_2oM8',
        kudos_issuer_contract: 'kudos-v1.gwg.testnet',
        // fractal_client_id: '2KdWlqCWoyMtfIHTEI60NgqDA015d0Uy2r5KieoZS3M', // for http://localhost:3000
        ...commonConfig,
      };
    default:
      throw new Error(`${environment} is not a valid NEAR environment`);
  }
}
