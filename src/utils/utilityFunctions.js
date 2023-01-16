import { wallet } from "../index";

export const checkAdmin = (walletAddress) => {
  return wallet.viewMethod({
    contractId: 'community-sbt-1.i-am-human.testnet',
    method: "is_admin",
    args: { addr: walletAddress },
  });
};
