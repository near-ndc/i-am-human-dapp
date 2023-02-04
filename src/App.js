import "regenerator-runtime/runtime";
import React from "react";
import { ToastContainer } from "react-toastify";

import { Landing } from "./pages/unAuth/index";
import { Home } from "./pages/auth/home";
import { useAdmin } from "./utils/useAdmin";
import { wallet } from "./index";

export function App({ isSignedIn }) {
  const [isUserAdmin] = useAdmin({ address: wallet?.accountId ?? "" });

  return (
    <>
      {(!isSignedIn || isUserAdmin) && <Landing isSignedIn={isSignedIn} />}
      {/* <Home /> */}
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
