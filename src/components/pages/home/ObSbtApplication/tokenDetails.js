import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

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
        method: "nft_supply_for_owner",
        args: { account: wallet_address },
      });
      const data2 = await wallet.viewMethod({
        contractId: "community-sbt-1.i-am-human.testnet",
        method: "nft_tokens_for_owner",
        args: { account: wallet_address },
      });
      console.log(data, data2);
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
  const isExpired = Date.now() > tokenData?.metadata?.expires_at;

  return (
    <div className="p-2">
      <div className="relative h-8 z-0 mb-2 w-full">
        {fetchloading ? (
          <div className="h-8 rounded w-60 bg-gray-200 animate-pulse" />
        ) : (
          <>
            {tokenData && (
              <>
                <div className="mb-2">
                  <div className="inline-block rounded px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
                    <p
                      className={`${
                        isExpired ? "text-red-500" : "text-green-600"
                      } font-semibold mb-2`}
                    >
                      {isExpired ? "Expired Tokens" : "Valid Token"}
                    </p>
                    <p>Token Id : {tokenData.token_id}</p>
                    <p>
                      Issued At :{" "}
                      {tokenData.metadata.issued_at
                        ? dayjs(tokenData.metadata.issued_at).format(
                            "DD MMMM YYYY"
                          )
                        : "null"}
                    </p>
                    <p>
                      Expires at :{" "}
                      {dayjs(tokenData.metadata.expires_at).format(
                        "DD MMMM YYYY"
                      )}
                    </p>
                    <p>
                      {Date.now() > tokenData.metadata.expires_at
                        ? "Days Since Expiration"
                        : "Days until expiration"}{" "}
                      :{" "}
                      {Math.abs(
                        dayjs(tokenData.metadata.expires_at).diff(
                          Date.now(),
                          "days"
                        )
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
