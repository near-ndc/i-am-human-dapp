import React, { useEffect, useState } from 'react';
import { Header } from '../../components/common/header';
import { IsSignedOutLanding } from './IsSignedOutLanding';
import { IsSignedInLanding } from './IsSignedInLanding';
import { getConfig } from '../../utils/config';

const URL = window.location;

export const Landing = ({ isSignedIn, setShowAdmin }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const { succes_fractal_state } = getConfig();
    const URL_state = new URLSearchParams(URL.search).get('state');

    if (URL_state === succes_fractal_state) {
      setActiveTabIndex(2);
    } else if (activeTabIndex === 0 && isSignedIn) {
      setActiveTabIndex(1);
    }
  }, [activeTabIndex, isSignedIn]);

  return (
    <div className="isolate bg-white">
      <Header setShowAdmin={setShowAdmin} isAdmin={false} />
      <main>
        <div className="mx-auto">
          {isStarted || isSignedIn ? (
            <IsSignedInLanding
              activeTabIndex={activeTabIndex}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : (
            <IsSignedOutLanding setIsStarted={setIsStarted} />
          )}
        </div>
      </main>
    </div>
  );
};
