import { wallet } from "../index";

export const checkAdmin = (walletAddress) => {
  return wallet.viewMethod({
    contractId: 'og-sbt.i-am-human.near',
    method: "is_admin",
    args: { addr: walletAddress },
  });
};
