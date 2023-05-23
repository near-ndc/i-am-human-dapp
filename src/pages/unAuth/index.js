import React, { useEffect, useState } from 'react';
import { Header } from '../../components/common/header';
import { IsSignedOutLanding } from './IsSignedOutLanding';
import { IsSignedInLanding } from './IsSignedInLanding';

export const Landing = ({ isSignedIn, setShowAdmin }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (activeTabIndex === 0 && isSignedIn) {
      setActiveTabIndex(1);
    }
  }, [activeTabIndex]);

  return (
    <div className="isolate bg-white">
      <Header setShowAdmin={setShowAdmin} isAdmin={false} />
      <main>
        <div className="max-w-2xl mx-auto mt-12 pt-5">
          {isStarted ? (
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
