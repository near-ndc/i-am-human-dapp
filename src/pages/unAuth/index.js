/* This example requires Tailwind CSS v3.0+ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '../../components/common/header';
import { wallet } from '../../index';
import dayjs from 'dayjs';

import { useAdmin } from '../../utils/useAdmin';
import HumanOnNDC from '../../images/backLines.png';
import { IsSignedInLanding } from './IsSignedInLanding';
import { supabase } from '../../utils/supabase';
import { toast } from 'react-toastify';
import { IAmHumanStatus } from '../../components/pages/landing/iAmHumanStatus';
import { ApplyCommunityVerify } from '../../components/pages/landing/applyCommunityVerify';
import { log_event } from '../../utils/utilityFunctions';
import {
  app_contract,
  gooddollar_contract,
  new_sbt_contract,
} from '../../utils/contract-addresses';

export const Landing = ({ isSignedIn, setShowAdmin }) => {
  const [isAdmin] = useAdmin({ address: wallet?.accountId ?? '' });
  const [hasApplied, setHasApplied] = useState(null);
  const [userData, setUserData] = useState({});
  const ref = useRef();
  const [showGooddollarVerification, setShowGooddollarVerification] =
    useState(false);
  const [showCommunityVerification, setShowCommunityVerification] =
    useState(false);
  useEffect(() => {
    if (isSignedIn) {
      const fetchUserStatus = async () => {
        const { data } = await supabase.select('users', {
          wallet_identifier: wallet.accountId,
        });
        if (data?.[0]) {
          setUserData(data[0]);
          if (data?.[0]?.['g$_address']) {
            setHasApplied(true);
          } else {
            setHasApplied(false);
          }
        } else {
          setHasApplied(false);
        }
      };
      setTimeout(() => {
        fetchUserStatus();
      }, 1500);
    }
  }, [isSignedIn]);

  const [fetchloading, setFetchLoading] = useState(false);
  const [tokenSupply, setTokenSupply] = useState(null);
  const [tokenData, setTokenData] = useState(null);

  const [fvFetchloading, setFvFetchLoading] = useState(false);
  const [fvTokenSupply, setFvTokenSupply] = useState(null);
  const [fvTokenData, setFvTokenData] = useState(null);

  const checkFVokens = useCallback(async () => {
    if (isSignedIn) {
      try {
        setFvFetchLoading(true);
        const data = await wallet.viewMethod({
          contractId: app_contract,
          method: 'sbt_supply_by_owner',
          args: { account: wallet.accountId, ctr: gooddollar_contract },
        });
        const data2 = await wallet.viewMethod({
          contractId: app_contract,
          method: 'sbt_tokens_by_owner',
          args: { account: wallet.accountId, ctr: gooddollar_contract },
        });
        if (!data2?.[0]?.[1]?.[0]) {
          await supabase.update(
            'users',
            { g$_address: null },
            { wallet_identifier: wallet.accountId }
          );
        }
        setFvTokenData(data2?.[0]?.[1]?.[0]);

        if (!data2?.[0] && localStorage.getItem('openFv')) {
          setShowGooddollarVerification(true);
          localStorage.removeItem('openFv');
        }
        setFvTokenSupply(parseInt(data));
      } catch (e) {
        console.log(e);
        toast.error('An error occured while fetching token supply');
        setFvFetchLoading(false);
      } finally {
        setFvFetchLoading(false);
      }
    }
  }, [isSignedIn]);

  //commenting this code because there is no SBT functionality inside this release
  const checkSBTTokens = useCallback(async () => {
    // if (isSignedIn) {
    //   try {
    //     setFetchLoading(true);
    //     const data = await wallet.viewMethod({
    //       contractId: app_contract,
    //       method: 'sbt_supply_by_owner',
    //       args: { account: wallet.accountId, ctr: new_sbt_contract },
    //     });
    //     const data2 = await wallet.viewMethod({
    //       contractId: app_contract,
    //       method: 'sbt_tokens_by_owner',
    //       args: { account: wallet.accountId, ctr: new_sbt_contract },
    //     });
    //     setTokenData(data2?.[0]?.[1]?.[0]);
    //     if (!data2?.[0] && localStorage.getItem('openOG')) {
    //       setShowCommunityVerification(true);
    //       localStorage.removeItem('openOG');
    //     }
    //     setTokenSupply(parseInt(data));
    //   } catch (e) {
    //     console.log(e);
    //     toast.error('An error occured while fetching token supply');
    //     setFetchLoading(false);
    //   } finally {
    //     setFetchLoading(false);
    //   }
    // }
  }, [isSignedIn]);

  useEffect(() => {
    checkSBTTokens();
    checkFVokens();
  }, [checkSBTTokens, checkFVokens]);
  const isExpired = Date.now() > tokenData?.metadata?.expires_at;
  const isFvExpired = Date.now() > fvTokenData?.metadata?.expires_at;

  return (
    <div className="isolate bg-white">
      <Header setShowAdmin={setShowAdmin} isAdmin={isAdmin} />
      <main>
        <div className={''}>
          <div className={'pb-20 mt-5'}>
            <div>
              <div className="md:flex items-center">
                <img
                  src={HumanOnNDC}
                  alt="humans on ndc"
                  className={`h-[600px] object-cover hidden md:block w-[60%] ml-[-10%]`}
                />

                <>
                  <div className="h-[fit-content] mt-[30px] md:mt-0">
                    <div className="px-10">
                      <p className="text-3xl font-semibold">
                        GET YOUR PROOF OF PERSONHOOD WITH I-AM-HUMAN
                      </p>
                      <p className="text-lg font-light leading-8 text-gray-600">
                        This is your launchpad for several different SBTs, each
                        of which will identify you as a human. With enough of
                        them you will have a strong proof-of-personhood, which
                        can give you access to vote, to apps, to DAOs and more.
                      </p>
                      <button
                        onClick={() => {
                          window.open(
                            'https://i-am-human.gitbook.io/i-am-human-docs/',
                            '_blank'
                          );
                        }}
                        className="inline-flex mt-2 rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <button
              onClick={() => {
                ref?.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="animate-bounce mx-auto bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 opacity-60 shadow-lg rounded-full flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-violet-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
          <>
            {isSignedIn && (
              <IsSignedInLanding
                hasApplied={hasApplied}
                userData={userData}
                setShowGooddollarVerification={setShowGooddollarVerification}
                showGooddollarVerification={showGooddollarVerification}
              />
            )}
            <ApplyCommunityVerify
              open={showCommunityVerification}
              userData={userData}
              onClose={() => setShowCommunityVerification(false)}
            />
            <div className="relative overflow-hidden">
              <div aria-hidden="true" />
              <div className="mb-12">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
                  <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:pb-16 lg:px-0">
                    <div>
                      <div className="mt-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                          Unique Face Verification
                        </h2>
                        {!fvTokenData && (
                          <>
                            {' '}
                            <p className="mt-4 text-lg text-gray-500">
                              We have partenered with Gooddollar for Face
                              Verification.
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                              Why? They ensure that each user only creates one
                              account, without having to rely on traditional KYC
                            </p>
                          </>
                        )}
                        <div className="mt-3">
                          <a
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noreferrer"
                            href="https://i-am-human.gitbook.io/i-am-human-docs/the-soulbound-tokens/face-verification"
                          >
                            Learn More
                          </a>
                        </div>
                        <div className="mt-6">
                          {!fvTokenData && (
                            <button
                              onClick={() => {
                                window.history.replaceState(
                                  {},
                                  '',
                                  window.location.origin
                                );
                                if (isSignedIn) {
                                  log_event({
                                    event_log:
                                      'Started FV SBT verification flow',
                                  });
                                  setShowGooddollarVerification(true);
                                } else {
                                  wallet.signIn();
                                  localStorage.setItem('openFv', 'true');
                                }
                              }}
                              className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                            >
                              Get It Now
                            </button>
                          )}
                          {fvFetchloading ? (
                            <div className="h-8 rounded w-60 bg-gray-200 animate-pulse" />
                          ) : (
                            <>
                              {fvTokenData && (
                                <>
                                  <p className="mb-2">
                                    <span className="font-medium">
                                      FV SBT Tokens you own
                                    </span>
                                    : {fvTokenSupply}
                                  </p>
                                  <div className="mb-2">
                                    <div className="inline-block rounded px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
                                      <p
                                        className={`${
                                          isFvExpired
                                            ? 'text-red-500'
                                            : 'text-green-600'
                                        } font-semibold mb-2`}
                                      >
                                        {isFvExpired
                                          ? 'Expired Tokens'
                                          : 'Valid Token'}
                                      </p>
                                      <p>Token Id : {fvTokenData.token}</p>
                                      <p>
                                        Issued At :{' '}
                                        {fvTokenData.metadata.issued_at
                                          ? dayjs(
                                              fvTokenData.metadata.issued_at
                                            ).format('DD MMMM YYYY')
                                          : 'null'}
                                      </p>
                                      <p>
                                        Expires at :{' '}
                                        {dayjs(
                                          fvTokenData.metadata.expires_at
                                        ).format('DD MMMM YYYY')}
                                      </p>
                                      <p>
                                        {Date.now() >
                                        fvTokenData.metadata.expires_at
                                          ? 'Days Since Expiration'
                                          : 'Days until expiration'}{' '}
                                        :{' '}
                                        {Math.abs(
                                          dayjs(
                                            fvTokenData.metadata.expires_at
                                          ).diff(Date.now(), 'days')
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
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <blockquote>
                        <div>
                          <p className="text-base text-gray-500">
                            &ldquo;The NDC App is really a breakthrough in how
                            we uniqelly identify humans on the web.&rdquo;
                          </p>
                        </div>
                        <footer className="mt-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                alt=""
                              />
                            </div>
                            <div className="text-base font-medium text-gray-700">
                              Marcia Hill, Web3 Specialist
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:pb-8 lg:px-0">
                    <div>
                      {/* Show OG SBT */}

                      <div className="mt-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                          {tokenData ? 'OG SBT' : ' OG SBT Application'}
                        </h2>
                        {fetchloading ? (
                          <div className="h-8 rounded w-60 bg-gray-200 animate-pulse" />
                        ) : (
                          <>
                            {tokenData && (
                              <>
                                <p className="mb-2">
                                  <span className="font-medium">
                                    SBT Tokens you own
                                  </span>
                                  : {tokenSupply}
                                </p>
                                <div className="mb-2">
                                  <div className="inline-block rounded px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 items-center space-y-1">
                                    <p
                                      className={`${
                                        isExpired
                                          ? 'text-red-500'
                                          : 'text-green-600'
                                      } font-semibold mb-2`}
                                    >
                                      {isExpired
                                        ? 'Expired Tokens'
                                        : 'Valid Token'}
                                    </p>
                                    <p>Token Id : {tokenData.token}</p>
                                    <p>
                                      Issued At :{' '}
                                      {tokenData.metadata.issued_at
                                        ? dayjs(
                                            tokenData.metadata.issued_at
                                          ).format('DD MMMM YYYY')
                                        : 'null'}
                                    </p>
                                    <p>
                                      Expires at :{' '}
                                      {dayjs(
                                        tokenData.metadata.expires_at
                                      ).format('DD MMMM YYYY')}
                                    </p>
                                    <p>
                                      {Date.now() >
                                      tokenData.metadata.expires_at
                                        ? 'Days Since Expiration'
                                        : 'Days until expiration'}{' '}
                                      :{' '}
                                      {Math.abs(
                                        dayjs(
                                          tokenData.metadata.expires_at
                                        ).diff(Date.now(), 'days')
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {!tokenData && (
                          <>
                            <p className="mt-4 text-lg text-gray-500">
                              Are you someone who stands out in the Near
                              ecosystem? Get the OG SBT. Apply here with your
                              Telegram account and send us a message explaining
                              in as few words as possible why you’re an OG.
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                              Our team will schedule a quick video chat or meet
                              you at Near Day to validate you in person. Limited
                              edition, max 300.
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                              Why? We need to create a “seed group” of trusted
                              individuals to bootstrap the next iteration of
                              Community SBT. Stay tuned.
                            </p>
                          </>
                        )}
                        <div className="mt-3">
                          <a
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noreferrer"
                            href="https://i-am-human.gitbook.io/i-am-human-docs/the-soulbound-tokens/community-verification"
                          >
                            Learn More
                          </a>
                        </div>
                        <div className="mt-6">
                          <button className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
                            Coming Soon (Stay Tuned)
                          </button>
                          {/* {!tokenData &&
                            (Boolean(userData?.og_sbt_application) ? (
                              <>
                                {userData?.og_sbt_application ===
                                  'Application Submitted' && (
                                  <div>
                                    <p>
                                      You've applied. Once we receive your
                                      Telegram message confirming your Near
                                      account your SBT will be approved and show
                                      up here.
                                    </p>
                                    <p className="mb-3">
                                      Send your Near account as a Telegram DM to{' '}
                                      <a
                                        href="https://t.me/iamhumanapp"
                                        target="_blank"
                                        className="underline text-indigo-600"
                                        rel="noreferrer"
                                      >
                                        @iamhumanapp
                                      </a>
                                    </p>
                                  </div>
                                )}
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  if (isSignedIn) {
                                    log_event({
                                      event_log:
                                        'Started OG SBT verification flow',
                                    });
                                    setShowCommunityVerification(true);
                                  } else {
                                    wallet.signIn();
                                    localStorage.setItem('openOG', 'true');
                                  }
                                }}
                                className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                              >
                                Get It Now
                              </button>
                            ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
                  <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:pb-8 lg:px-0">
                    <IAmHumanStatus
                      isSbtToken={Boolean(tokenData)}
                      isFvToken={Boolean(fvTokenData)}
                    />
                  </div>
                </div>
              </div>

              {/* <KycDao /> */}
            </div>
            <div ref={ref} id="bottom" />
          </>
        </div>
      </main>
    </div>
  );
};
