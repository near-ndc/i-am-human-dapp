import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { RecoverModal, MintAndRenewTokenModal } from "./ManageTokenFiles/index";
import { wallet } from "../../../index";
import { ButtonLoader } from "../../common/buttonLoader";
import { log_event } from "../../../utils/utilityFunctions";

export const ManageTokens = () => {
  const [input, setInput] = React.useState("");
  const [validatingAddress, setValidatingAddress] = React.useState(false);
  const [isButtonLoading, setIsButtonLoading] = React.useState({
    revoke: false,
    renew: false,
    recover: false,
    mint: false,
  });
  const [isMintModalOpen, setMintModalOpen] = useState(false);
  const [isRenewModalOpen, setRenewModalOpen] = useState(false);
  const [tokens, setTokens] = React.useState({
    sbtTokens: 0,
    supply: 0,
    tokenData: [],
    initialized: false,
    rawResult: {},
  });

  function countDots(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ".") {
        count++;
      }
    }
    return count;
  }

  const isStringValidated = React.useMemo(() => {
    if (input === "") {
      return true;
    }
    const testnet = ".near";
    const dots = countDots(input);
    if (input.endsWith(testnet) && dots === 1) {
      return true;
    }
    return false;
  }, [input]);

  useEffect(() => {
    setTokens((d) => ({ ...d, initialized: false }));
  }, [input]);

  const checkTokens = React.useCallback(
    async ({ hideMessage = false }) => {
      try {
        setValidatingAddress(true);
        const data = await wallet.viewMethod({
          contractId: 'og-sbt.i-am-human.near',
          method: "nft_tokens_for_owner",
          args: { account: input },
        });
        setTokens({
          sbtTokens: data.length,
          tokenData: data,
          initialized: true,
        });
        if (!hideMessage) {
          const isExpired = Date.now() > data?.[0]?.metadata.expires_at;
          if (data.length === 1 && !isExpired) {
            toast.success("SBT is valid");
          } else if (data.length === 1 && isExpired) {
            toast.success("SBT is expired");
          } else if (data.length === 0) {
            toast.success("No SBT Found");
          }
        }
      } catch {
        toast.error("An error occured while validating the address");
      } finally {
        setValidatingAddress(false);
      }
    },
    [input]
  );

  const mintTokens = async (metadata = {}) => {
    try {
      setIsButtonLoading((d) => ({ ...d, mint: true }));
      await wallet.callMethod({
        contractId: 'og-sbt.i-am-human.near',
        method: "sbt_mint",
        args: {
          receiver: input,
          metadata: metadata,
        },
      });
      log_event({
        event_log: `${wallet.accountId} minted OG SBT tokens for ${input}`,
        effected_wallet: input,
      });
      checkTokens({ hideMessage: true });
      toast.success("Minted SBT successfully !");
    } catch (e) {
      console.log(e);
      toast.error("An error occured while minting");
    } finally {
      setMintModalOpen(false);
      setIsButtonLoading((d) => ({ ...d, mint: false }));
    }
  };

  const revokeTokens = async () => {
    try {
      setIsButtonLoading((d) => ({ ...d, revoke: true }));
      await wallet.callMethod({
        contractId: 'og-sbt.i-am-human.near',
        method: "revoke_for",
        args: { accounts: [input], metadata: {} },
      });
      log_event({
        event_log: `${wallet.accountId} revoked OG SBT tokens for ${input}`,
        effected_wallet: input,
      });
      toast.success("Revoked SBT successfully !");
      await checkTokens({ hideMessage: true });
    } catch (e) {
      toast.error("An error occured while minting");
    } finally {
      setIsButtonLoading((d) => ({ ...d, revoke: false }));
    }
  };

  const renewTokens = async (metadata = {}) => {
    try {
      setIsButtonLoading((d) => ({ ...d, renew: true }));
      await wallet.callMethod({
        contractId: 'og-sbt.i-am-human.near',
        method: "sbt_renew",
        args: {
          tokens: [tokens.tokenData[0].token_id],
          metadata,
          ttl: metadata.ttl ? parseInt(metadata.ttl) : 60,
        },
      });
      log_event({
        event_log: `${wallet.accountId} renewed OG SBT tokens for ${input}`,
        effected_wallet: input,
      });
      toast.success("Renewed SBT successfully !");
      await checkTokens({ hideMessage: true });
    } catch (e) {
      toast.error("An error occured while renewing");
    } finally {
      setRenewModalOpen(false);
      setIsButtonLoading((d) => ({ ...d, renew: false }));
    }
  };

  const isButtonEnabled = isStringValidated && input !== "";
  const buttonClass = `text-white ${
    isButtonEnabled ? "bg-blue-700  hover:bg-blue-800" : "bg-gray-400"
  } focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mb-2 focus:outline-none `;

  const { initialized, sbtTokens } = tokens;

  const buttonProps = (enabled) => ({
    className: `text-white ${
      enabled ? "bg-blue-700  hover:bg-blue-800" : "bg-gray-400"
    } focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mb-2 focus:outline-none`,
    disabled: !enabled,
  });

  const mintButtonProps = buttonProps(sbtTokens === 0);
  const renewButtonProps = buttonProps(sbtTokens === 1);
  const revokeButtonProps = buttonProps(sbtTokens === 1);

  const isExpired =
    Date.now() > tokens?.tokenData?.[0]?.metadata.expires_at;

  return (
    <div className="p-2">
      <p className="text-3xl font-semibold">Manage SBT's for Verified Humans</p>
      <div className="relative z-0 mb-2 mt-6 w-full group">
        <input
          type="email"
          name="floating_address"
          id="floating_address"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          required
        />
        <label
          htmlFor="floating_address"
          className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Paste verified wallet address here
        </label>
      </div>
      <div className="flex space-x-2">
        {initialized && tokens.tokenData.length === 0 && (
          <div className="mb-2 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
            <p>No tokens found</p>
          </div>
        )}
        {initialized && tokens.tokenData?.[0] && (
          <div className="mb-2">
            <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
              <p
                className={`${
                  isExpired ? "text-red-500" : "text-green-600"
                } font-semibold text-lg mb-2`}
              >
                {isExpired ? "Expired Tokens" : "Valid Token"}
              </p>
              <p>Token Id : {tokens.tokenData[0].token_id}</p>
              <p>
                Issued At :{" "}
                {tokens.tokenData[0].metadata.issued_at
                  ? dayjs(tokens.tokenData[0].metadata.issued_at).format(
                      "DD MMMM YYYY"
                    )
                  : "null"}
              </p>
              <p>
                Expires at :{" "}
                {dayjs(tokens.tokenData[0].metadata.expires_at).format(
                  "DD MMMM YYYY"
                )}
              </p>
              <p>
                {Date.now() > tokens.tokenData[0].metadata.expires_at
                  ? "Days Since Expiration"
                  : "Days until expiration"}{" "}
                :{" "}
                {Math.abs(
                  dayjs(tokens.tokenData[0].metadata.expires_at).diff(
                    Date.now(),
                    "days"
                  )
                )}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* {initialized && (
        <div className="mb-2">
          <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2">
            <p>Raw Result : {JSON.stringify(rawResult)}</p>
          </div>
        </div>
      )} */}
      {!isStringValidated && (
        <p className="my-2 text-red-600 text-xs">
          Provided addresss should be a valid one with only .near at the end
          and containing only 1 (.)
        </p>
      )}
      <div className="flex items-center space-x-3">
        {!initialized && (
          <button
            onClick={() => {
              checkTokens({ hideMessage: false });
            }}
            disabled={!isButtonEnabled}
            className={`${buttonClass} w-60`}
          >
            {validatingAddress ? <ButtonLoader /> : "Check Tokens"}
          </button>
        )}
        {initialized && (
          <>
            <button
              type="button"
              {...mintButtonProps}
              onClick={() => setMintModalOpen(true)}
            >
              {mintButtonProps.disabled === false && isButtonLoading.mint ? (
                <ButtonLoader />
              ) : (
                "Mint SBT"
              )}
            </button>
            <button
              type="button"
              {...renewButtonProps}
              onClick={() => setRenewModalOpen(true)}
            >
              {renewButtonProps.disabled === false && isButtonLoading.renew ? (
                <ButtonLoader />
              ) : (
                "Renew SBT"
              )}
            </button>
            <RecoverModal
              isButtonEnabled={isButtonEnabled}
              buttonClass={buttonClass}
              input={input}
            />
            <button type="button" {...revokeButtonProps} onClick={revokeTokens}>
              {revokeButtonProps.disabled === false &&
              isButtonLoading.revoke ? (
                <ButtonLoader />
              ) : (
                "Revoke SBT"
              )}
            </button>
          </>
        )}
      </div>
      <div className="p-4 shadow rounded-lg w-full md:w-[60%] w-full">
        <p className="text-sm italic">
          Current SBT admins can use this page to manage SBTs of members. Before
          an admin mints a new SBT, they are required to validate the member
          application, including meeting the applicant in a video call to verify
          that they are a real human. The first time an SBT is minted to a
          member account it will get status Pending. Two other admins will also
          have to mint to the same account before it becomes an actual SBT.
          Revoke, recover and renew are executed immediately.
        </p>
      </div>
      <div className="p-2 shadow mt-4 rounded-lg w-full w-[fit-content] w-full">
        <p className="text-sm font-medium">
          Note: the Recover function is not yet operational
        </p>
      </div>
      <MintAndRenewTokenModal
        input={input}
        closeModal={() => {
          setRenewModalOpen(false);
          setMintModalOpen(false);
        }}
        isMint={isMintModalOpen}
        isOpen={isMintModalOpen || isRenewModalOpen}
        isLoading={isButtonLoading.mint || isButtonLoading.renew}
        mintTokens={mintTokens}
        renewTokens={renewTokens}
      />
    </div>
  );
};
