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

const URL = window.location;

export function IndexPage({ isSignedIn }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
    console.log('URL_state', URL_state);
    if (URL_state === succes_fractal_state) {
      setActiveTabIndex(2);
      setShowConnectWallet(true);
    } else if (isSignedIn) {
      setActiveTabIndex(1);
    }
  }, []);

  const TabsData = [
    {
      name: 'Connect Wallet',
      header: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      ),
    },
    {
      name: 'Face Scan',
      header: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
      ),
    },
    {
      name: 'Mint SBT',
      header: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 stroke-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 pt-10">
      <Header setShowAdmin={setShowAdmin} isAdmin={false} />
      {!showConnectWallet ? (
        <>
          <div className="mt-[80px] md:mt-[100px] flex flex-col gap-y-32">
            <div className="flex flex-wrap gap-10">
              <div className="flex-1 min-w-[300px]">
                <h1 className="font-bold text-4xl">
                  Get your Proof of Personhood with I-AM-HUMAN
                </h1>
                <p className="my-5">
                  Welcome, I-AM-HUMAN is your launchpad for several different
                  types of Soul Bound Tokens (SBTs). Each of which will identify
                  you as a human. With enough of these SBTs, you will have a
                  strong proof-of-personhood, which give you access to voting on
                  governance, on-chain reputation, DAOs, grassroots funding, and
                  much more.
                </p>
                <p className="">All you need to do is 3 easy steps</p>
                <div className="grid grid-cols-3 my-5 gap-5">
                  {TabsData.map((tab, index) => {
                    return (
                      <div>
                        <div className="flex items-center gap-5">
                          <div className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 w-fit p-1">
                            {tab.header}
                          </div>
                          {index < 2 ? (
                            <hr class="h-px my-8 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 w-full" />
                          ) : (
                            <span></span>
                          )}
                        </div>
                        <p className="col-span-2 text-md mt-2">{tab.name}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-10">
                  <button
                    onClick={() => setShowConnectWallet(true)}
                    className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
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
                    className="rounded-md border border-purple-500 text-purple-500 border-1 px-4 py-2 text-base font-light text-black shadow-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div className="flex-1 min-w-[300px] order-first md:order-last">
                <img src={Design} className="w-full object-fill" />
              </div>
            </div>
            {isSignedIn ? <Home /> : <Landing />}
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
  );
}
