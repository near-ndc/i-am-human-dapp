import React, { useState, useEffect, useCallback } from 'react';
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

export const FractalVerification = ({ setShowGooddollarVerification }) => {
  const [editableFields, setEditableFields] = useState({
    code: '',
    claimer: wallet.accountId,
    redirect_uri: 'https://i-am-human-dev.netlify.app/',
  });
  const [submit, setSubmit] = useState(null);

  const { values, handleSubmit, handleBlur, handleChange, setValues } =
    useFormik({
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
          event_log: `Data sent to verify API ${JSON.stringify(
            editableFields
          )}`,
        });
        try {
          const result = await verifyUser(editableFields);
          const { data } = await supabase.select('users', {
            wallet_identifier: wallet.accountId,
          });
          log_event({
            event_log: `Data receivied from verify API ${JSON.stringify(
              result
            )}`,
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

  const [showStep, setShowStep] = useState(2);

  const fractalLoginCb = useCallback(
    async (data) => {
      if (data?.error) return alert('Login request denied !');
      const { fractal_link, fractal_client_id } = getConfig();
      const fractalVerifyURL =
        fractal_link +
        '/authorize?' +
        `client_id=${fractal_client_id}&redirect_uri=${encodeURIComponent(
          window.location.href
        )}&response_type=code&scope=contact%3Aread%20verification.uniqueness%3Aread%20verification.uniqueness.details%3Aread&state=test&ensure_wallet=${
          wallet.accountId
        }`;

      log_event({
        event_log: `Raw Data received on Fractal ${JSON.stringify(
          fractalVerifyURL
        )}`,
      });
      window.location.href = fractalVerifyURL;
    },
    [setValues]
  );

  useEffect(() => {
    const URL = window.location;
    if (URL.href.includes('&state')) {
      setShowStep(3);
      const code = new URLSearchParams(URL.search).get('code');
      setEditableFields((d) => ({
        ...d,
        code,
        redirect_uri: URL.origin,
      }));
    }
  }, []);

  const steps = {
    0: '5%',
    1: '10%',
    2: '50%',
    3: '100%',
  };

  const { isExistingGUser, loading: isGLoading } = useUniqueGUser({
    gAddress: values.gDollarAccount,
  });

  return (
    <div className="p-2 pt-5 w-full">
      <p className="w-full text-sm font-light italic mt-2">
        Experimental feature. GoodDollar is a web3 protocol which whitelists its
        users with a simple face scan. Images are not stored, only a “hash” of
        your face for comparison with other users.
      </p>
      <div className="w-full mt-4">
        <div>
          <div className="mt-2" aria-hidden="true">
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-indigo-600"
                style={{ width: steps[showStep] }}
              />
            </div>
            <div className="mt-2 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
              <div className={showStep > 0 && 'text-indigo-600'}>
                Create a gooddollar account
              </div>
              <div
                className={`${showStep > 1 && 'text-indigo-600'} text-center`}
              >
                Authorize NDC
              </div>
              <div
                className={`${showStep > 2 && 'text-indigo-600'} text-right`}
              >
                Apply For SBT
              </div>
            </div>
          </div>
        </div>
        {showStep === 0 && (
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-xl">Do you own a gooddollar account ?</p>
            <div className="ml-auto w-[fit-content] text-center space-x-2">
              <button
                onClick={() => setShowStep(2)}
                type="button"
                className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <p className="mx-auto w-[fit-content]">Yes</p>
              </button>
              <button
                onClick={() => setShowStep(1)}
                type="button"
                className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <p className="mx-auto w-[fit-content]">No</p>
              </button>
            </div>
          </div>
        )}
        {showStep === 1 && (
          <>
            <p className="text-3xl font-semibold mt-5">
              Sign up and get face-verified with GoodDollar
            </p>
            <p className="text-sm font-light italic mt-2">
              In this step you will be asked to create an account by signing up
              with GoodDollar. Once you have access to their wallet you need to
              click the “Claim” button in the center of the screen, and follow
              the prompts to scan your face . If you are already a GoodDollar
              claimer you can skip this step. Note: We recommend using a
              smartphone for this step. This may be geo-blocked for certain
              countries.
            </p>
            <button
              onClick={() => {
                window.open('https://wallet.gooddollar.org', '_blank');
              }}
              className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 mb-3"
            >
              Sign up with G$
            </button>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xl">
                Created your account on gooddollar yet ?
              </p>
              <div className="ml-auto w-[fit-content] text-center space-x-2">
                <button
                  onClick={() => setShowStep(2)}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <p className="mx-auto w-[fit-content]">Yes</p>
                </button>
              </div>
            </div>
          </>
        )}
        {showStep === 2 && (
          <div className="w-full mt-14">
            <p className="text-3xl font-semibold ">
              Authorize NDC to access your GD profile
            </p>
            <p className="text-sm font-light italic mt-2">
              Log in again, this time authorizing us to verify that you were
              whitelisted and therefore also verified as a unique human. Note:
              This feature doesn’t work on phones yet, and is also geo-blocked
              for certain countries.
            </p>
            {window.location.href.includes('?login=') ? (
              <></>
            ) : (
              <div
                className="w-[fit-content]"
                onClick={() => {
                  log_event({ event_log: 'Fractal authorization started' });
                }}
              >
                <button
                  onClick={() => fractalLoginCb()}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-60 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <p className="mx-auto w-[fit-content]">Authorize Fractal</p>
                </button>
              </div>
            )}
          </div>
        )}
        {showStep === 3 && (
          <div className="mt-14">
            <p className="text-3xl font-semibold ">
              Apply for a Face Verification SBT
            </p>
            <p className="w-full text-sm font-light italic mt-2">
              Once you passed step 1 and 2 your information will be populated
              here and you will be able to apply for a Face Verification SBT.
            </p>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="font-light tracking-wider w-full space-y-2 mt-3 mb-16"
            >
              {values.status === 'Whitelisted' ? (
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
              ) : (
                <>
                  <p>
                    Oops! It looks like you are not whitelisted. Usually this
                    would happen if you created a GoodDollar account but didn’t
                    complete the face verification flow.
                  </p>
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
                    onClick={() => {
                      setShowGooddollarVerification(false);
                    }}
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
                    ' Apply for SBT'
                  ) : (
                    <div className="w-[fit-content] mx-auto">
                      <CircleSpinner size={20} />
                    </div>
                  )}
                </button>
              )}
            </form>
          </div>
        )}
      </div>
      <div className="p-4 shadow rounded-lg w-full w-full mt-4">
        <p className="text-sm italic">
          Experimental feature. GoodDollar is a web3 protocol which whitelists
          its users with a simple face scan. Images are not stored, only a
          “hash” of your face for comparison with other users. If you have an
          account with GoodDollar then you will be able to mint a ‘verified
          unique’ SBT here. If you don’t yet have an account, please sign up for
          one first at www.gooddollar.org.{' '}
        </p>
      </div>
    </div>
  );
};
