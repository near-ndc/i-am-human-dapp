export const near_contract =
  process.env.environment === "dev"
    ? "og-sbt-1.i-am-human.testnet"
    : "og-sbt.i-am-human.near";
export const gooddollar_contract =
  process.env.environment === "dev"
    ? "gooddollar-v1.i-am-human.testnet"
    : "gooddollar-v1.i-am-human.near";
