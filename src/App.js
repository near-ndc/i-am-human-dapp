import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Landing } from "./pages/unAuth/index";
import { Home } from "./pages/auth/home";
import { useAdmin } from "./utils/useAdmin";
import { wallet } from "./index";

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
      <div className="w-[fit-content] mx-auto pb-10">
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
      </div>

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
