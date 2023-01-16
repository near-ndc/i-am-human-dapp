import "regenerator-runtime/runtime";
import React from "react";
import { ToastContainer } from "react-toastify";

import { Landing } from "./pages/unAuth/index";
import { Home } from "./pages/auth/home";

export function App({ isSignedIn }) {
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <Landing />;
  }

  return (
    <>
      <Home />
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
