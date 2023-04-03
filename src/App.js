import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Landing } from "./pages/unAuth/index";
import { Home } from "./pages/auth/home";
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
      {/* <div className="w-[fit-content] mx-auto pb-10">
        <a
          href="https://hr6bimbyqly.typeform.com/to/wVhraeUG"
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Give us your valuable feedback
          </span>
        </a>
      </div> */}

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
