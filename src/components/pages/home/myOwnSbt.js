import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { wallet } from "../../../index";
import { TransferSBT } from "./MyOwnSbtFiles/transferSbt";

export const CheckSbtTokenStatus = () => {
  const [fetchloading, setFetchLoading] = useState(true);
  const [tokenSupply, setTokenSupply] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const isButtonDisabled = tokenSupply === 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkSBTTokens = useCallback(async () => {
    try {
      setFetchLoading(true);
      const data = await wallet.viewMethod({
        contractId:'community-sbt-1.i-am-human.testnet',
        method: "sbt_supply_by_owner",
        args: { account: wallet.accountId },
      });
      const data2 = await wallet.viewMethod({
        contractId: 'community-sbt-1.i-am-human.testnet',
        method: "sbt_by_owner",
        args: { account: wallet.accountId },
      });
      setTokenData(data2?.[0] ?? null);
      setTokenSupply(parseInt(data));
    } catch {
      toast.error("An error occured while fetching token supply");
      setFetchLoading(false);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSBTTokens();
  }, [checkSBTTokens]);
  const isExpired = Date.now() > tokenData?.metadata?.expires_at * 1000;

  return (
    <div className="p-2">
      <p className="text-3xl font-semibold">Your SBT Tokens</p>
      <div className="relative h-8 z-0 mb-2 mt-6 w-full">
        {fetchloading ? (
          <div className="h-8 rounded w-60 bg-gray-200 animate-pulse" />
        ) : (
          <p>
            <span className="font-medium">SBT Tokens you own</span>:{" "}
            {tokenSupply}
          </p>
        )}
      </div>
      <div className="mb-2">
        {tokenData && (
          <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
            <p
              className={`${
                isExpired ? "text-red-500" : "text-green-600"
              } font-semibold text-lg mb-2`}
            >
              {isExpired ? "Expired Tokens" : "Valid Token"}
            </p>
            <p>TokenId : {tokenData.token_id}</p>
            <p>
              Issued At :{" "}
              {tokenData.metadata.issued_at
                ? dayjs(tokenData.metadata.issued_at * 1000).format(
                    "DD MMMM YYYY"
                  )
                : "null"}
            </p>
            <p>
              Expires at :{" "}
              {dayjs(tokenData.metadata.expires_at * 1000).format(
                "DD MMMM YYYY"
              )}
            </p>
            <p>
              {Date.now() > tokenData.metadata.expires_at * 1000
                ? "Days Since Expiration"
                : "Days until expiration"}{" "}
              :{" "}
              {Math.abs(
                dayjs(tokenData.metadata.expires_at * 1000).diff(
                  Date.now(),
                  "days"
                )
              )}
            </p>
          </div>
        )}
      </div>
      <button
        type="button"
        disabled={isButtonDisabled}
        onClick={() => setIsModalOpen(true)}
        className={`text-white focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
          isButtonDisabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-800"
        } `}
      >
        Transfer SBT between my own accounts
      </button>
      <TransferSBT
        isOpen={isModalOpen}
        checkSBTTokens={checkSBTTokens}
        closeModal={() => setIsModalOpen(false)}
      />
      <div className="p-4 shadow rounded-lg w-full md:w-[60%] w-full">
        <p className="text-sm italic">
          In our target state a user will be able to transfer their SBT between
          their own accounts only, by signing in with both accounts in the same
          session. (In this prototype a user can transfer their SBT to any other
          address.)
        </p>
      </div>
    </div>
  );
};
