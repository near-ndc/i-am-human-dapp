import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { CommunityDataKeys } from '../utils/campaign';
import { Header } from '../components/common/header';
import { PrivacyComponent } from '../components/common/privacy';
import { Footer } from '../components/common/footer';
import Design from '../images/NDC-Lines.svg';
import { Landing } from './unAuth';
import { Home } from './auth/home';
import { IsSignedInLanding } from './unAuth/IsSignedInLanding';
import { getConfig } from '../utils/config';
import { wallet } from '..';
import { WalletSVG } from '../images/WalletSVG';
import { FaceSVG } from '../images/FaceSVG';
import { MintSVG } from '../images/MintSVG';
import { Tabs } from '../components/pages/home/tabs';
import { supabase } from '../utils/supabase';
import { LSKeys, convertToTimestamptz } from '../utils/constants';
import { isNumber, log_event } from '../utils/utilityFunctions';
import { isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import { updateTrackerStatus } from '../redux/reducer/tracker';

const URL = window.location;

export function IndexPage({ isSignedIn }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [successSBT, setSuccessSBT] = useState(false);
  const [fvTokens, setFVTokens] = useState(null);
  const [kycTokens, setKYCTokens] = useState(null);
  const [ogTokens, setOGTokens] = useState(null);
  const dispatch = useDispatch();

  async function storeCommunityVerticalData() {
    try {
      const communityName = localStorage.getItem('community-name');
      const communityVertical = localStorage.getItem('community-vertical');
      if (communityName && fvTokens) {
        const { data } = await supabase.select('scoreboard', {
          account: wallet.accountId,
        });
        if (!data?.[0]) {
          await supabase.insert('scoreboard', {
            account: wallet.accountId,
            [CommunityDataKeys.COMMUNITY_NAME]: communityName,
            [CommunityDataKeys.COMMUNITY_VERTICAL]: communityVertical,
          });
        }
        // since the data is stored in db, removing it from LS
        localStorage.removeItem(CommunityDataKeys.COMMUNITY_NAME);
        localStorage.removeItem(CommunityDataKeys.COMMUNITY_VERTICAL);
      }
    } catch (error) {
      log_event({ event_log: 'Scoreboard Error: ' + JSON.stringify(error) });
      console.log('Error occurred while saving data in scoreboard db', error);
    }
  }

  // checking for existing user data with token_id to make sure we store data for all users (new and old)
  async function createFVEventLog() {
    const { data } = await supabase.select('users', {
      wallet_identifier: wallet.accountId,
    });
    if (!data?.length) {
      const userData = {
        fv_token_id: fvTokens.token,
        fv_issued_date: convertToTimestamptz(fvTokens?.metadata?.issued_at),
        fv_expire_date: convertToTimestamptz(fvTokens?.metadata?.expires_at),
        fv_status: 'Mint Success',
        wallet_identifier: wallet.accountId,
      };
      await supabase.insert('users', userData);
      log_event({
        event_log: `User successfully minted their FV SBT token: ${fvTokens.token}`,
      });
    } else if (data.length > 0 && !data[0]?.['fv_token_id']) {
      // update data
      const userData = {
        fv_token_id: fvTokens.token,
        fv_issued_date: convertToTimestamptz(fvTokens?.metadata?.issued_at),
        fv_expire_date: convertToTimestamptz(fvTokens?.metadata?.expires_at),
        fv_status: 'Mint Success',
      };
      await supabase.update('users', userData, {
        wallet_identifier: wallet.accountId,
      });
    }
  }

  async function createOGEventLog() {
    const { data } = await supabase.select('users', {
      wallet_identifier: wallet.accountId,
    });
    if (!data?.length) {
      // no entry exists, insert data
      const userData = {
        og_tokens_metadata: ogTokens,
        wallet_identifier: wallet.accountId,
      };
      await supabase.insert('users', userData);
    } else if (
      !data[0]?.['og_tokens_metadata'] ||
      !isEqual(data[0]?.['og_tokens_metadata'], ogTokens) // some new type of OG token can be issued
    ) {
      // update data
      const userData = {
        og_tokens_metadata: ogTokens,
      };
      await supabase.update('users', userData, {
        wallet_identifier: wallet.accountId,
      });
    }
  }

  useEffect(() => {
    storeCommunityVerticalData();
    const { succes_fractal_state } = getConfig();
    const URL_state = new URLSearchParams(URL.search).get('state');
    if (URL_state === succes_fractal_state && wallet?.accountId) {
      setActiveTabIndex(2);
    }
    if (fvTokens && localStorage.getItem(LSKeys.SHOW_SBT_PAGE)) {
      setSuccessSBT(true);
      localStorage.removeItem(LSKeys.SHOW_SBT_PAGE);
      setActiveTabIndex(2);
    }
    if (fvTokens) {
      createFVEventLog();
    }
  }, [fvTokens]);

  useEffect(() => {
    if (ogTokens) {
      createOGEventLog();
    }
  }, [ogTokens]);

  useEffect(() => {
    // setting vertical and community in LS till user mint the token (after which we store the data in supbase db)
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const community = params.get('community');
    const vertical = params.get('vertical');
    if (community && vertical) {
      localStorage.setItem(CommunityDataKeys.COMMUNITY_NAME, community);
      localStorage.setItem(CommunityDataKeys.COMMUNITY_VERTICAL, vertical);
    }
  }, []);

  const TabsData = [
    {
      name: 'Connect Wallet',
      header: <WalletSVG styles={`w-10 h-10 stroke-themeColor`} />,
    },
    {
      name: 'Face Scan',
      header: <FaceSVG styles={`w-10 h-10 stroke-themeColor`} />,
    },
    {
      name: 'Mint SBT',
      header: <MintSVG styles={`w-10 h-10 stroke-themeColor`} />,
    },
  ];

  const getStarted = () => {
    if (wallet?.accountId) {
      setActiveTabIndex(1);
    } else {
      setActiveTabIndex(0);
    }
  };

  useEffect(() => {
    if (isNumber(activeTabIndex)) {
      dispatch(updateTrackerStatus(false));
    } else {
      dispatch(updateTrackerStatus(true));
    }
  }, [activeTabIndex]);

  return (
    <div
      style={{
        backgroundImage:
          typeof activeTabIndex !== 'number' && !showAdmin
            ? `url(${Design})`
            : 'none',
        zIndex: 10,
      }}
      className={'bg-no-repeat home_bg_image'}
    >
      <div
        style={{ background: 'transparent' }}
        className="isolate bg-white mx-auto max-w-7xl px-5 pt-10"
      >
        <Header
          setActiveTabIndex={setActiveTabIndex}
          setShowAdmin={setShowAdmin}
          isAdmin={false}
        />
        {showAdmin ? (
          <Tabs isAdmin={showAdmin} />
        ) : (
          <>
            {typeof activeTabIndex !== 'number' ? (
              <>
                <div className="mt-[70px] md:mt-[100px] flex flex-col gap-y-16 md:gap-y-32">
                  <div className="flex flex-wrap gap-10">
                    <div className="flex-1 min-w-[300px]">
                      <h1 className="font-bold text-5xl">
                        Get your Proof of Personhood with
                        <br />
                        I-AM-HUMAN
                      </h1>
                      <p className="my-5 mt-10">
                        {wallet.accountId
                          ? 'Join the NEAR Digital Collective (NDC) community. Engage in governance, voting, build a strong on-chain reputation, unlock DAO potential, and drive grassroots funding. Shape the future of NEAR with meaningful and impactful actions.'
                          : 'Welcome, I-AM-HUMAN is your launchpad for several different types of Soul Bound Tokens (SBTs). Each of which will identify you as a human. With enough of these SBTs, you will have a strong proof-of-personhood, which give you access to voting on governance, on-chain reputation, DAOs, grassroots funding, and much more.'}
                      </p>
                      <p>All you need to do is 3 easy steps.</p>
                      <div className="my-10">
                        <div className="grid grid-cols-3 gap-1 md:gap-2 items-center justify-center md:justify-start">
                          {TabsData.map((tab, index) => {
                            return (
                              <div className="flex items-center gap-1 md:gap-2">
                                <div className="rounded-full border border-2 border-themeColor svg-themeColor w-fit p-2">
                                  {tab.header}
                                </div>
                                {index < 2 ? (
                                  <hr className="h-px my-8 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 w-full" />
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {/* for responsive better styling */}
                        <div className="grid grid-cols-3 gap-1 md:gap-2 items-center justify-center md:justify-start">
                          {TabsData.map((tab) => {
                            return (
                              <p className="text-sm md:text-md mt-2">
                                {tab.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex md:justify-start flex-wrap gap-x-10 gap-y-5">
                        {/* show get started only if no tokens are minted by user */}
                        {!kycTokens && !fvTokens && !ogTokens && (
                          <button
                            onClick={() => getStarted()}
                            className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 md:px-10 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                          >
                            Get Started
                          </button>
                        )}
                        {(kycTokens || fvTokens || ogTokens) && (
                          <button
                            onClick={() =>
                              window.open(
                                'https://t.me/+fcNhYGxK891lMjMx',
                                '_blank'
                              )
                            }
                            className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 md:px-10 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                          >
                            Join the NDC Community
                          </button>
                        )}
                        <button
                          onClick={() =>
                            window.open(
                              'https://i-am-human.gitbook.io/i-am-human-docs/',
                              '_blank'
                            )
                          }
                          className="rounded-md border border-purple-500 text-purple-500 border-1 px-5 md:px-10 py-2 text-base font-light text-black shadow-sm"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-[300px] order-last">
                      <img
                        src={Design}
                        className="w-full object-fill hidden md:invisible"
                      />
                    </div>
                  </div>
                  {isSignedIn ? (
                    <Home
                      setActiveTabIndex={setActiveTabIndex}
                      sendFVTokensDetails={setFVTokens}
                      sendKYCTokensDetails={setKYCTokens}
                      sendOGTokenDetails={setOGTokens}
                    />
                  ) : (
                    <Landing setActiveTabIndex={setActiveTabIndex} />
                  )}
                </div>
                <PrivacyComponent />
              </>
            ) : (
              <IsSignedInLanding
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                successSBT={successSBT}
                setSuccessSBT={setSuccessSBT}
              />
            )}
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
