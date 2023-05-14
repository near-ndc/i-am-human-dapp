import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { use } from 'react-router-dom';

import { Landing } from './unAuth/index';
import { Home } from './auth/home';

export function IndexPage({ isSignedIn }) {
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const community = params.get('community');
    const vertical = params.get('vertical');
    console.log(vertical);
    if (community && vertical) {
      localStorage.setItem('community-name', community);
      localStorage.setItem('community-vertical', vertical);
    }
  }, []);
  return (
    <>
      {showAdmin ? (
        <>
          <Home setShowAdmin={setShowAdmin} />
        </>
      ) : (
        <>
          <Landing setShowAdmin={setShowAdmin} isSignedIn={isSignedIn} />
        </>
      )}
    </>
  );
}
