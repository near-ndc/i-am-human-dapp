import React, { useEffect, useState } from "react";
import { SwishSpinner } from "react-spinners-kit";
import { BackwardIcon } from "@heroicons/react/24/outline";

import { CheckSbtTokenStatus } from "./../../components/pages/home/myOwnSbt";
import { Gooddollar } from "../../components/pages/home/Gooddollar";
import { wallet } from "../../index";
import { supabase } from "../../utils/supabase";

export const IsSignedInLanding = ({
  hasApplied,
  userData,
  showGooddollarVerification,
  setShowGooddollarVerification,
}) => {
  useEffect(() => {
    if (window.location.href.includes("?login")) {
      setShowGooddollarVerification(true);
    }
  }, [setShowGooddollarVerification]);
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
      {hasApplied === false && showGooddollarVerification && (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setShowGooddollarVerification(false)}
            className="bg-blue-600 p-2 rounded-full text-white"
          >
            <BackwardIcon className="w-6 h-6" />
          </button>
          <Gooddollar />
        </div>
      )}
      {hasApplied === true && (
        <>
          {userData?.status === "Application Submitted" && (
            <p>Your application for community SBT has been submitted</p>
          )}
          {userData?.status === "Application Processed" && (
            <p>Your application for community SBT is being processed</p>
          )}
          {userData?.status === "Application Denied" && <p>TO DO</p>}
          {userData?.status === "Approved" && <CheckSbtTokenStatus />}
        </>
      )}
    </>
  );
};
