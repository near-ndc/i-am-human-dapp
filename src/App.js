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
      {/* <div className="h-screen flex items-center justify-between">
        <section className="bg-white h-[fit-content] mx-auto w-[fit-content] max-w-5xl">
          <div className="py-8 px-4 text-center lg:py-16 lg:px-12">
            <img
              className="mx-auto mb-4 w-40 h-40 text-gray-400"
              src={Logo}
              alt="Logo"
            />

            <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              We are under maintenance, please check back soon !
            </h1>
            <p className="font-light text-gray-500 md:text-lg xl:text-xl">
              A HUGE Thanks to all that have helped test the alpha-version of
              I-am-Human Prototype! We have taken down the site for maintenance
              for a few days to work on your feedback: Create a better UX
              experience, decentralize the backend, improved security, etc. A
              Beta version will be back up soon, and more upgrades to follow
              over the next few months.
            </p>
          </div>
        </section>
      </div> */}
    </>
  );
}
