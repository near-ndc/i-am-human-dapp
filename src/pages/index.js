import 'regenerator-runtime/runtime';
import React, { useState } from 'react';

import { Landing } from './unAuth/index';
import { Home } from './auth/home';

export function IndexPage({ isSignedIn }) {
  const [showAdmin, setShowAdmin] = useState(false);
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
