import { getEnv } from './config';

const environment = process.env.REACT_APP_ENV;
const {
  app_contract: appcontract,
  new_sbt_contract: newsbtcontract,
  og_contract: ogcontract,
  gooddollar_contract: gooddollarcontract,
  networkId,
} = getEnv(environment);

export const app_contract = appcontract;
export const new_sbt_contract = newsbtcontract;
export const near_contract = ogcontract;
export const gooddollar_contract = gooddollarcontract;
export const networkConfig = networkId;
