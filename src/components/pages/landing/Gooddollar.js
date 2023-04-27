import React, { useState, useEffect, useCallback } from 'react';
import {
  createLoginLink,
  parseLoginResponse,
  LoginButton,
} from '@gooddollar/goodlogin-sdk';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-phone-number-input/style.css';
import { CircleSpinner } from 'react-spinners-kit';
import { wallet } from '../../..';
import 'react-phone-number-input/style.css';
import { verifyUser } from '../../../services/api';
import { useUniqueGUser } from '../../../utils/uniqueUser';

import { supabase } from '../../../utils/supabase';

import getConfig from '../../../config';
import { log_event } from '../../../utils/utilityFunctions';
import { gooddollar_contract } from '../../../utils/contract-addresses';
const config = getConfig();

export const Gooddollar = ({ setShowGooddollarVerification }) => {
  const gooddollarLink = createLoginLink({
    v: 'I-AM-HUMAN-DAPP',
    web: 'https://i-am-human.dapp/',
    id: '0x09D2011Ca5781CA70810F6d82837648132762F9a',
    r: ['name'],
    rdu: window.location.href,
  });
  const [rawGoodDollarData, setRawGoodDollarData] = React.useState(null);
  const [editableFields, setEditableFields] = React.useState({
    name: true,
    gDollarAccount: true,
    status: true,
  });
  const [isVerifyApiError, setIsVerifyApiError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(null);

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
        setSubmitting(true);
        const { sig, ...rawData } = rawGoodDollarData;

        const sendObj = {
          m: JSON.stringify(rawData),
          c: wallet.accountId,
          sig: rawGoodDollarData.sig,
        };
        console.log(sendObj);
        let error = null;
        let updateData = {
          wallet_identifier: wallet.accountId,
          g$_address: data.gDollarAccount,
          status: 'Approved',
        };

        try {
          const result = await verifyUser(sendObj);
          const { data } = await supabase.select('users', {
            wallet_identifier: wallet.accountId,
          });

          if (data?.[0]) {
            const { error: appError } = await supabase.update(
              'users',
              updateData,
              { wallet_identifier: wallet.accountId }
            );
          } else {
            const { error: appError } = await supabase.insert(
              'users',
              updateData
            );
          }
          console.log(result);
          if (result?.m) {
            await wallet.callMethod({
              contractId: gooddollar_contract,
              method: 'sbt_mint',
              args: {
                claim_b64: result.m,
                claim_sig: result.sig,
              },
              deposit: '8000000000000000000000',
            });
            log_event({ event_log: 'Applied for OG SBT' });
          } else {
            setIsVerifyApiError(true);
          }
        } catch (e) {
          console.log('Error', e);
          toast.error(
            'An error occured while submitting your details , please try again'
          );
        } finally {
          setSubmitting(false);
        }
      },
      validate: (values) => {
        const errors = {};
        // if (values.phone) {
        //   if (!isPossiblePhoneNumber(values.phone)) {
        //     errors.phone =
        //       "Invalid phone number, please provide the phone number with valid country code";
        //   }
        // } else {
        //   errors.phone = "Phone Number Required";
        // }
        return errors;
      },
    });

  const handleValues = (key) => ({
    value: values[key],
    disabled: editableFields?.[key],
    onChange: handleChange(key),
    onBlur: handleBlur(key),
  });

  const [showStep, setShowStep] = useState(0);

  const gooddollarLoginCb = useCallback(
    async (data) => {
      try {
        if (data.error) return alert('Login request denied !');
        parseLoginResponse(data).then((d) => {
          setRawGoodDollarData(data);
          setEditableFields((d) => ({
            ...d,
            email: !Boolean(d?.email?.value),
          }));
          setEditableFields((d) => ({
            ...d,
            mobile: !Boolean(d?.mobile?.value),
          }));
          const isVerified =
            d?.isAddressWhitelisted?.value === true ||
            d?.isAddressWhitelisted?.isVerified === true;
          setValues({
            gDollarAccount: d?.walletAddress?.value,
            status: isVerified ? 'Whitelisted' : 'Not Whitelisted',
          });
          setShowStep(3);
        });
      } catch (e) {
        console.log(e);
      }
    },
    [setValues]
  );

  useEffect(() => {
    if (window.location.href.includes('?login=')) {
      const loginURI = window?.location?.href.split('=');
      const buffer = Buffer.from(
        decodeURIComponent(loginURI[1]),
        'base64'
      ).toString('ascii');
      if (buffer[buffer.length - 1] !== '}') {
        let lastIndex = buffer.lastIndexOf('}');
        log_event({ event_log: 'Gooddollar Authorization done' });
        gooddollarLoginCb(JSON.parse(buffer.slice(0, lastIndex + 1)));
      } else {
        gooddollarLoginCb(JSON.parse(buffer));
      }
    }
  }, [gooddollarLoginCb]);

  useEffect(() => {
    if (window.location.href.includes('?login')) {
      // TODO here we avoid double encode URI and change incorrect symbols, fast workaround
      // window.history.replaceState({}, '', window.location.href.replace('%253D', '='));
      setShowStep(2);
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
                  log_event({ event_log: 'Gooddollar authorization started' });
                }}
              >
                <LoginButton
                  onLoginCallback={gooddollarLoginCb}
                  className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2"
                  gooddollarlink={gooddollarLink}
                  rdu="gasdasd"
                >
                  Authorize G$
                </LoginButton>
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
            {isVerifyApiError ? (
              <div className="bg-red-100 rounded-md p-3 mt-3">
                <p>
                  There seems to be an issue. Please submit a Support request in
                  the NDC Community Hub:
                </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 font-light underline"
                  href="https://t.me/+B1DHtSWeNME0Yzgx"
                >
                  NDC Community Hub
                </a>
              </div>
            ) : (
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
                      would happen if you created a GoodDollar account but
                      didn’t complete the face verification flow.
                    </p>
                  </>
                )}

                {values.status === 'Whitelisted' ? (
                  <>
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
                        <p>
                          This Gooddollar account is already registered with us.
                        </p>
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
                            event_log:
                              'Started Application flow for gooddollar',
                          });
                        }}
                        disabled={submitting}
                        className="bg-blue-600 w-40 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right"
                      >
                        {!submitting ? (
                          ' Apply for SBT'
                        ) : (
                          <div className="w-[fit-content] mx-auto">
                            <CircleSpinner size={20} />
                          </div>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-right w-[fit-content] ml-auto space-y-5">
                    <button
                      type="button"
                      onClick={() => {
                        window.open('https://wallet.gooddollar.org', '_blank');
                      }}
                      className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2"
                    >
                      Did you set up GoodDollar wallet and make your first claim
                      ?
                    </button>

                    <p>
                      You'll need to claim once before you can apply for face
                      vertification SBT{' '}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        window.history.replaceState(
                          {},
                          '',
                          window.location.origin
                        );
                        setShowStep(2);
                      }}
                      className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2"
                    >
                      Claimed GoodDollar ? Authorize Login Again !
                    </button>
                  </div>
                )}
              </form>
            )}
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
