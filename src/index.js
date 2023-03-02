// React
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";

// NEAR
import { Wallet } from "./utils/near-wallet";
const CONTRACT_ADDRESS = 'og-sbt.i-am-human.near';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
export const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

const root = ReactDOM.createRoot(document.getElementById('root'));

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  root.render(
    <App
      isSignedIn={isSignedIn}
      contractId={CONTRACT_ADDRESS}
      wallet={wallet}
    />
  );
};
