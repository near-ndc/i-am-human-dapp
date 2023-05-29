import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { CommunityDataKeys } from '../utils/campaign';
import { Header } from '../components/common/header';
import { PrivacyComponent } from '../components/common/privacy';
import { Footer } from '../components/common/footer';
import Design from '../images/backLines.png';
import { Landing } from './unAuth';
import { Home } from './auth/home';
import { IsSignedInLanding } from './unAuth/IsSignedInLanding';
import { getConfig } from '../utils/config';
import { wallet } from '..';
import { WalletSVG } from '../images/WalletSVG';
import { FaceSVG } from '../images/FaceSVG';
import { MintSVG } from '../images/MintSVG';

const URL = window.location;

export function IndexPage({ isSignedIn }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(null);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const community = params.get('community');
    const vertical = params.get('vertical');
    if (community && vertical) {
      localStorage.setItem(CommunityDataKeys.COMMUNITY_NAME, community);
      localStorage.setItem(CommunityDataKeys.COMMUNITY_VERTICAL, vertical);
    }
    const { succes_fractal_state } = getConfig();
    const URL_state = new URLSearchParams(URL.search).get('state');

    if (URL_state === succes_fractal_state) {
      setActiveTabIndex(2);
    }
  }, []);

  const TabsData = [
    {
      name: 'Connect Wallet',
      header: <WalletSVG styles={`w-12 h-12 stroke-purple-400`} />,
    },
    {
      name: 'Face Scan',
      header: <FaceSVG styles={`w-12 h-12 stroke-purple-400`} />,
    },
    {
      name: 'Mint SBT',
      header: <MintSVG styles={`w-12 h-12 stroke-purple-400`} />,
    },
  ];

  return (
    <div
      style={{
        backgroundImage:
          typeof activeTabIndex !== 'number' ? `url(${Design})` : 'none',
        zIndex: 10,
      }}
      className={
        'bg-no-repeat md:bg-[right_top_8%] ' +
        (wallet.accountId ? 'bg-[center_top_5%]' : 'bg-[center_top_2.5%]')
      }
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
        {typeof activeTabIndex !== 'number' ? (
          <>
            <div className="mt-[200px] md:mt-[100px] flex flex-col gap-y-16 md:gap-y-32">
              <div className="flex flex-wrap gap-10">
                <div className="flex-1 min-w-[300px]">
                  <h1 className="font-bold text-5xl">
                    Get your Proof of Personhood with
                    <br />
                    I-AM-HUMAN
                  </h1>
                  <p className="my-5 mt-10">
                    Welcome, I-AM-HUMAN is your launchpad for several different
                    types of Soul Bound Tokens (SBTs). Each of which will
                    identify you as a human. With enough of these SBTs, you will
                    have a strong proof-of-personhood, which give you access to
                    voting on governance, on-chain reputation, DAOs, grassroots
                    funding, and much more.
                  </p>
                  <p>All you need to do is 3 easy steps.</p>
                  <div className="my-10">
                    <div className="grid grid-cols-3 gap-5 items-center">
                      {TabsData.map((tab, index) => {
                        return (
                          <div className="flex items-center gap-5">
                            <div className="rounded-full border border-2 border-purple-400 w-fit p-1">
                              {tab.header}
                            </div>
                            {index < 2 ? (
                              <hr class="h-px my-8 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 w-full" />
                            ) : (
                              <span></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* for responsive better styling */}
                    <div className="grid grid-cols-3 gap-5 items-center">
                      {TabsData.map((tab) => {
                        return <p className="text-md mt-2">{tab.name}</p>;
                      })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-10 gap-y-5">
                    <button
                      onClick={() => {
                        if (wallet?.accountId) {
                          setActiveTabIndex(1);
                        } else {
                          setActiveTabIndex(0);
                        }
                      }}
                      className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-10 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          'https://i-am-human.gitbook.io/i-am-human-docs/',
                          '_blank'
                        )
                      }
                      className="rounded-md border border-purple-500 text-purple-500 border-1 px-10 py-2 text-base font-light text-black shadow-sm"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="flex-1 min-w-[300px] order-first md:order-last">
                  <img src={Design} className="w-full object-fill invisible" />
                </div>
              </div>
              {isSignedIn ? (
                <Home setActiveTabIndex={setActiveTabIndex} />
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
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
