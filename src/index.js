// React
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";
import { Provider, ErrorBoundary } from "@rollbar/react"; // Provider imports 'rollbar'

// NEAR
import { Wallet } from "./utils/near-wallet";
const CONTRACT_ADDRESS = "community-sbt-1.i-am-human.testnetr";

const rollbarConfig = {
  accessToken: "31e514c3334a42728684b0638472dd32",
  environment: "testenv",
};

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
export const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

const root = ReactDOM.createRoot(document.getElementById("root"));

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={
          <p className="p-4">Oops an error occurred , please try again</p>
        }
      >
        <App
          isSignedIn={isSignedIn}
          contractId={CONTRACT_ADDRESS}
          wallet={wallet}
        />
      </ErrorBoundary>
    </Provider>
  );
};
