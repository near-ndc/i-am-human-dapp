import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CircleSpinner } from 'react-spinners-kit';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import 'react-phone-number-input/style.css';
import 'react-phone-number-input/style.css';
import { wallet } from '../../..';
import { verifyUser } from '../../../services/api';
import { supabase } from '../../../utils/supabase';
import { log_event } from '../../../utils/common';
import { getConfig } from '../../../utils/config';
import { WalletSVG } from '../../../images/WalletSVG';
import { FaceSVG } from '../../../images/FaceSVG';
import { MintSVG } from '../../../images/MintSVG';
import { Warning } from '../../../images/Warning';
import FVSBTImage from '../../../images/FvSBT.png';
import Timer from '../../common/countdown';
import { SuccesVerification } from './FractalVerification/Success';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please try again.';

export const ConnectWallet = () => (
  <div className="w-full">
    <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-purple-400">
      <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-purple-500 bg-purple-200 shadow-[inset_0_0px_4px_#FFFFFF] shadow-purple-400">
        <WalletSVG styles="w-12 h-12 fill-purple-400 stroke-purple-200" />
      </div>
    </div>
    <h2 className="text-4xl font-bold	my-4">Connect Wallet</h2>
    <p className="text-s mb-8">
      A NEAR wallet is required. Be sure you connect an account you want to use
      for <br /> governance. Get a new account if you don't already have one.
    </p>
    <button
      onClick={() => wallet.signIn()}
      type="button"
      className="w-full md:w-max rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
    >
      <p className="mx-auto w-[fit-content]">Connect Wallet</p>
    </button>
  </div>
);

export const MintSBT = ({
  setActiveTabIndex,
  setError,
  isError,
  successSBT,
}) => {
  const [editableFields, setEditableFields] = useState({
    code: '',
    claimer: wallet.accountId,
    redirect_uri: '',
  });
  const [submit, setSubmit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const mintSBT = async (token) => {
    window.history.replaceState({}, '', window.location.origin);
    setSubmit(true);
    let updateData = {
      wallet_identifier: wallet.accountId,
      ...editableFields,
    };
    const verifyData = { ...editableFields, captcha: token };
    log_event({
      event_log: `Data sent to verify API ${JSON.stringify(editableFields)}`,
    });
    try {
      const result = await verifyUser(verifyData);
      if (result?.error) {
        setError(true);
        // not using fractal error message, since it is quite vague
        setErrorMessage(
          'Your face scan is waiting to be processed by Fractal. Please wait for a few minutes.'
        );
        return;
      }

      const { data } = await supabase.select('users', {
        wallet_identifier: wallet.accountId,
      });
      log_event({
        event_log: `Data receivied from verify API ${JSON.stringify(result)}`,
      });
      if (data?.[0]) {
        await supabase.update('users', updateData, {
          wallet_identifier: wallet.accountId,
        });
      } else {
        await supabase.insert('users', updateData);
      }
      log_event({ event_log: 'Applied for FV SBT' });
      const { fractal_contract } = getConfig();
      // fetch fees requirement from contract
      const fees = await wallet.viewMethod({
        contractId: fractal_contract,
        method: 'get_required_sbt_mint_deposit',
        args: {
          is_verified_kyc: result?.kyc == 'approved', // get exact mint cost
        },
      });
      await wallet.callMethod({
        contractId: fractal_contract,
        method: 'sbt_mint',
        args: {
          claim_b64: result.m,
          claim_sig: result.sig,
        },
        deposit: BigInt(fees).toString(),
      });
    } catch (e) {
      log_event({
        event_log: `Error happened while submitting FB SBT ${JSON.stringify(
          e
        )}`,
      });
      toast.error(
        'An error occured while submitting your details , please try again'
      );
    } finally {
      setSubmit(false);
    }
  };

  useEffect(() => {
    const URL = window.location;
    if (URL.href.includes('&state')) {
      const code = new URLSearchParams(URL.search).get('code');
      setEditableFields((d) => ({
        ...d,
        code,
        redirect_uri: URL.origin,
      }));
    }
  }, []);

  const handleVerifyRecaptcha = async () => {
    setSubmit(true);
    if (!executeRecaptcha) {
      toast.error('Recaptcha has not been loaded');
      setSubmit(false);
      return;
    }

    const token = await executeRecaptcha('homepage');
    if (!successSBT && token) {
      await mintSBT(token);
    }
    setSubmit(false);
  };

  const tryAgain = () => {
    setActiveTabIndex(1);
    setError(false);
    setErrorMessage(DEFAULT_ERROR_MESSAGE);
  };

  return successSBT ? (
    <SuccesVerification />
  ) : (
    <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center">
      <div>
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-purple-400">
          <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-purple-500 bg-purple-200 shadow-purple-400 shadow-[inset_0_0px_4px_#FFFFFF]">
            <MintSVG styles="w-12 h-12 stroke-purple-400" />
          </div>
        </div>
        <h2 className="text-4xl font-bold	my-4">
          Mint Face Verification Soul Bound Token
        </h2>
        <p className="text-s mb-8 mr-8">
          Congratulations! You're eligible to receive Soul Bound Tokens (SBTs)
          that verify that you are a human.
        </p>
        {isError ? (
          <>
            <div className="flex mr-10">
              <button
                onClick={() => tryAgain()}
                type="button"
                className="rounded-md bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
              >
                {submit ? (
                  <CircleSpinner size={20} />
                ) : (
                  <p className="mx-auto min-w-max">Try Again</p>
                )}
              </button>
              <div className="rounded-md px-4 py-2 text-base font-medium text-red-500 shadow-sm bg-red-100 ml-3 flex">
                <Warning />
                <p className="ml-2">{errorMessage}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-y-5 md:gap-0 flex-wrap items-center">
            <button
              onClick={handleVerifyRecaptcha}
              type="button"
              className="w-full md:w-max rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
            >
              {submit ? (
                <CircleSpinner size={20} />
              ) : (
                <p className="mx-auto w-[fit-content]">Mint Your SBT</p>
              )}
            </button>

            <div className="flex items-center ml-4">
              <p className="mr-1">Expire in</p>
              <Timer delayResend="600" setActiveTabIndex={setActiveTabIndex} />
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block md:min-w-[250px] order-first md:order-last w-full md:w-1/3 flex justify-center">
        <img src={FVSBTImage} className="object-fill" />
      </div>
    </div>
  );
};

export const ScanFace = () => {
  const [submit, setSubmit] = useState(null);
  const [isApprovalAwait, setApproval] = useState(false);
  const fractalLoginCb = () => {
    setSubmit(true);
    const { fractal_link, fractal_client_id, succes_fractal_state } =
      getConfig();
    const fractalVerifyURL =
      fractal_link +
      '/authorize?' +
      `client_id=${fractal_client_id}&redirect_uri=${encodeURIComponent(
        window.location.origin
      )}&response_type=code&scope=contact%3Aread%20verification.uniqueness%3Aread%20verification.uniqueness.details%3Aread&state=${succes_fractal_state}&ensure_wallet=${
        wallet.accountId
      }`;
    log_event({
      event_log: `Raw Data received on Fractal ${JSON.stringify(
        fractalVerifyURL
      )}`,
    });
    window.open(fractalVerifyURL, '_blank');
    // showing processing screen since we open the verify URL in new tab
  };

  useEffect(() => {
    const { succes_fractal_state } = getConfig();
    const URL_state = new URLSearchParams(URL.search).get('state');
    // if on redirect we are on this tab, it means user approval is awaiting
    if (URL_state === succes_fractal_state && wallet?.accountId) {
      setApproval(true);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-purple-400">
        <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-purple-500 bg-purple-200 shadow-[inset_0_0px_4px_#FFFFFF] shadow-purple-400">
          <FaceSVG styles="w-12 h-12 fill-purple-400 stroke-purple-200" />
        </div>
      </div>
      <h2 className="text-4xl font-bold	my-4">Face Scan</h2>
      <p className="font-semibold mb-4">
        Have you used Fractal before? Use the same email you had used with
        Fractal.
      </p>
      <p className="text-s mb-8">
        For the face scan, please create or log into your Fractal account.
        Follow the steps on <br /> the Fractal website to complete the
        verification.
        <br />
        <br />
        Keep your phone nearby in case Face Verification fails on desktop. Once
        you've <br /> finished the verification on Fractal, return to
        I-AM-HUMAN.
      </p>
      <div className="flex">
        <button
          onClick={() => fractalLoginCb()}
          type="button"
          className={`w-full md:w-max rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 ${
            isApprovalAwait ? 'bg-red-500' : ''
          }`}
          disabled={submit}
        >
          {submit ? (
            <div className="flex gap-x-5">
              <p>Verifying Your Uniqueness with Fractal</p>
              <CircleSpinner size={20} />
            </div>
          ) : (
            <p className="mx-auto w-[fit-content]">
              {isApprovalAwait ? 'Try Again' : 'Start Face Scan with Fractal'}
            </p>
          )}
        </button>
        {isApprovalAwait && (
          <div className="bg-red-100 p-3 rounded-md">
            Your face scan is waiting to be processed by Fractal. Please wait
            for a few minutes.
          </div>
        )}
      </div>
      <p className="font-light italic mt-4 text-sm">
        * Fractal is a web3 identity provider. Do you have issues with Fractal
        verification? Please see the{' '}
        <a
          href="https://i-am-human.gitbook.io/i-am-human-docs/help/troubleshooting-faq"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Troubleshoot Guide
        </a>{' '}
        for solutions.
      </p>
    </div>
  );
};
