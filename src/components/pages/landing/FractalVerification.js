import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CircleSpinner } from 'react-spinners-kit';
import 'react-phone-number-input/style.css';
import 'react-phone-number-input/style.css';
import { wallet } from '../../..';
import { verifyUser } from '../../../services/api';
import { useUniqueGUser } from '../../../utils/uniqueUser';
import { supabase } from '../../../utils/supabase';
import { log_event } from '../../../utils/utilityFunctions';
import { getConfig } from '../../../utils/config';

export const ConnectWallet = () => (
  <div className="mt-8">
    <p className="text-s mb-5">
      Near wallet is required. Be sure you connect the wallet you want to use
      for governance. Get a new wallet for free if you don't already have one
      (or need an alt).
    </p>
    <button
      onClick={() => wallet.signIn()}
      type="button"
      className="flex items-center mx-auto rounded border border-transparent bg-indigo-600 w-60 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <p className="mx-auto w-[fit-content]">Connect Wallet</p>
    </button>
  </div>
);

export const MintSBT = ({ setActiveTabIndex }) => {
  const [editableFields, setEditableFields] = useState({
    code: '',
    claimer: wallet.accountId,
    redirect_uri: '',
  });
  const [submit, setSubmit] = useState(null);

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      name: '',
      gDollarAccount: '',
      status: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email'),
    }),
    onSubmit: async (data) => {
      // here need to clear url and remove all unnecessary data from url for near wallet redirect
      window.history.replaceState({}, '', window.location.origin);
      setSubmit(true);
      let updateData = {
        wallet_identifier: wallet.accountId,
        g$_address: data.gDollarAccount,
        status: 'Approved',
      };
      log_event({
        event_log: `Data sent to verify API ${JSON.stringify(editableFields)}`,
      });
      try {
        const result = await verifyUser(editableFields);
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
        const { mintFee, fractal_contract } = getConfig();
        await wallet.callMethod({
          contractId: fractal_contract,
          method: 'sbt_mint',
          args: {
            claim_b64: result.m,
            claim_sig: result.sig,
          },
          deposit: mintFee,
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
    },
  });

  const handleValues = (key) => ({
    value: values[key],
    disabled: editableFields?.[key],
    onChange: handleChange(key),
    onBlur: handleBlur(key),
  });

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

  const { isExistingGUser, loading: isGLoading } = useUniqueGUser({
    gAddress: values.gDollarAccount,
  });

  return (
    <div className="p-2 w-full">
      <div className="mt-14">
        <p className="text-l mt-2">
          To get your I Am Human SBT you must first connect a Near wallet and
          complete the fractal face scan. Revisit this step after completing
          both of the prerequisits!
        </p>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex justify-center font-light tracking-wider mt-3 mb-16"
        >
          {values.status === 'Whitelisted' && (
            <>
              <div className="flex items-center justify-between">
                <p className="w-[120px]">G$ Account:</p>
                <input
                  className="w-[88%] bg-gray-100 p-1 rounded px-3"
                  placeholder="Account Address"
                  {...handleValues('gDollarAccount')}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="w-[120px]">Status:</p>
                <input
                  className="w-[88%] bg-gray-100 p-1 rounded px-3"
                  placeholder="Status"
                  {...handleValues('status')}
                />
              </div>
            </>
          )}

          {isGLoading ? (
            <>
              <button className="bg-blue-600 w-40 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right">
                <div className="w-[fit-content] mx-auto">
                  <CircleSpinner size={20} />
                </div>
              </button>
            </>
          ) : isExistingGUser ? (
            <>
              <p>This Gooddollar account is already registered with us.</p>
              <button
                type="button"
                onClick={() => null}
                className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2"
              >
                Ok
              </button>
            </>
          ) : (
            <button
              type="submit"
              onClick={() => {
                log_event({
                  event_log: 'Started Application flow for gooddollar',
                });
              }}
              disabled={submit}
              className="bg-blue-600 w-40 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right"
            >
              {!submit ? (
                'Mint SBT'
              ) : (
                <div className="w-[fit-content] mx-auto">
                  <CircleSpinner size={20} />
                </div>
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export const ScanFace = () => {
  const fractalLoginCb = () => {
    const { fractal_link, fractal_client_id, succes_fractal_state } =
      getConfig();
    const fractalVerifyURL =
      fractal_link +
      '/authorize?' +
      `client_id=${fractal_client_id}&redirect_uri=${encodeURIComponent(
        window.location.href
      )}&response_type=code&scope=contact%3Aread%20verification.uniqueness%3Aread%20verification.uniqueness.details%3Aread&state=${succes_fractal_state}&ensure_wallet=${
        wallet.accountId
      }`;

    log_event({
      event_log: `Raw Data received on Fractal ${JSON.stringify(
        fractalVerifyURL
      )}`,
    });
    window.location.href = fractalVerifyURL;
  };

  return (
    <div className="p-2 w-full">
      <div className="w-full mt-14">
        <p className="text-l mt-2">
          To complete the face scan, create a new Fractal account or log into an
          existing one. Please use the same email you previously used with
          Fractal if you already have an account.
        </p>
        <p className="text-l mt-5">
          While on the Fractal website, you'll need to follow the.
        </p>
        <p className="text-l my-5">
          Have your phone handy in case Face Verification fails on desktop.
          Return to I-AM-HUMAN when you've completed the verification on
          Fractal.
        </p>
        <div
          onClick={() =>
            log_event({ event_log: 'Fractal authorization started' })
          }
        >
          <button
            onClick={() => fractalLoginCb()}
            type="button"
            className="flex items-center mx-auto rounded border border-transparent bg-indigo-600 w-60 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <p className="mx-auto w-[fit-content]">Start Face Scan</p>
          </button>
        </div>
        <p className="text-l font-light italic mt-5">
          Fractal is a web3 identity provider. Your images are not stored, only
          a “hash” of your face for uniqueness comparison with other users.
        </p>
      </div>
    </div>
  );
};
