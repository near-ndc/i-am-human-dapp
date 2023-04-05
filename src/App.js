import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Landing } from './pages/unAuth/index';
import { Home } from './pages/auth/home';
//hard code 3 near address to show additional data

export function App({ isSignedIn }) {
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
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
