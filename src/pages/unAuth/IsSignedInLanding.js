import React, { useEffect } from "react";
import { SwishSpinner } from "react-spinners-kit";

import { CheckSbtTokenStatus } from "./../../components/pages/home/myOwnSbt";
import { Gooddollar } from "../../components/pages/home/Gooddollar";
import { Panel } from "../../components/common/panel";

export const IsSignedInLanding = ({
  hasApplied,
  userData,
  showGooddollarVerification,
  setShowGooddollarVerification,
}) => {
  useEffect(() => {
    if (window.location.href.includes("?login")) {
      setShowGooddollarVerification(true);
    } else {
      setShowGooddollarVerification(false);
    }
  }, [setShowGooddollarVerification, hasApplied]);
  return (
    <>
      {hasApplied === null && (
        <div className="w-[fit-content] pt-20 space-x-3 mx-auto">
          <div className="w-[fit-content] mx-auto">
            <SwishSpinner color="blue" />
          </div>
          <p className="animate text-sm mt-2 text-gray-500">
            Loading your account details{" "}
            <span className="animate-pulse">...</span>
          </p>
        </div>
      )}
      <Panel
        open={showGooddollarVerification}
        onClose={() => setShowGooddollarVerification(false)}
        title="Get Verified and Apply for Community SBT"
      >
        <div className="max-w-6xl mx-auto px-2">
          <Gooddollar />
        </div>
      </Panel>
      {hasApplied === true && (
        <>
          {/* {userData?.status === "Application Denied" && <p>TO DO</p>} */}
          {/* {userData?.status === "Approved" && <CheckSbtTokenStatus />} */}
        </>
      )}
    </>
  );
};
