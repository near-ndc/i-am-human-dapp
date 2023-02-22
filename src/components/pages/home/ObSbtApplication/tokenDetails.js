import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";

import { wallet } from "../../../../index";

export const SbtTokenStatus = ({ wallet_address }) => {
  const [fetchloading, setFetchLoading] = useState(true);
  const [tokenSupply, setTokenSupply] = useState(null);
  const [tokenData, setTokenData] = useState(null);

  const checkSBTTokens = useCallback(async () => {
    try {
      setFetchLoading(true);
      const data = await wallet.viewMethod({
        contractId: "community-sbt-1.i-am-human.testnet",
        method: "sbt_supply_by_owner",
        args: { account: wallet_address },
      });
      const data2 = await wallet.viewMethod({
        contractId: "community-sbt-1.i-am-human.testnet",
        method: "sbt_by_owner",
        args: { account: wallet_address },
      });
      setTokenData(data2?.[0] ?? null);
      setTokenSupply(parseInt(data));
    } catch {
      toast.error("An error occured while fetching token supply");
      setFetchLoading(false);
    } finally {
      setFetchLoading(false);
    }
  }, [wallet_address]);

  useEffect(() => {
    checkSBTTokens();
  }, [checkSBTTokens]);
  const isExpired = Date.now() > tokenData?.metadata?.expires_at * 1000;

  return (
    <div className="p-2">
      <div className="relative h-8 z-0 mb-2 w-full">
        {fetchloading ? (
          <div className="h-8 rounded w-60 bg-gray-200 animate-pulse" />
        ) : (
          <>
            <p>
              <span className="font-medium">SBT Tokens owned</span>:{" "}
              {tokenSupply}
            </p>
            {tokenData && (
              <>
                <p
                  className={`${
                    isExpired ? "text-red-500" : "text-green-600"
                  } font-light mb-2`}
                >
                  {isExpired
                    ? "Expired tokens"
                    : "Valid Token"}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
