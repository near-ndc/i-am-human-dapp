import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Landing } from "./pages/unAuth/index";
import { Home } from "./pages/auth/home";
import { useAdmin } from "./utils/useAdmin";
import { wallet } from "./index";

export function App({ isSignedIn }) {
  console.log('render app');
  const [isUserAdmin] = useAdmin({ address: wallet?.accountId ?? "" });
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
