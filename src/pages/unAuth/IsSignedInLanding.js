import React, { useEffect, useState } from "react";
import { SwishSpinner } from "react-spinners-kit";

import { CheckSbtTokenStatus } from "./../../components/pages/home/myOwnSbt";
import { Gooddollar } from "../../components/pages/home/Gooddollar";
import { wallet } from "../../index";
import { supabase } from "../../utils/supabase";

export const IsSignedInLanding = () => {
  const [hasApplied, setHasApplied] = useState(null);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserStatus = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .match({ wallet_identifier: "harrydhillon.testnet" });
      console.log(data, wallet.accountId);
      if (data?.[0]) {
        setUserData(data[0]);
        setHasApplied(true);
      } else {
        setHasApplied(false);
      }
    };
    setTimeout(() => {
      fetchUserStatus();
    }, 1500);
  }, []);
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
      {hasApplied === false && <Gooddollar />}
      {hasApplied === true && (
        <>
          {userData?.status === "Application Submitted" ? (
            <p>Your application for community SBT has been submitted</p>
          ) : (
            <CheckSbtTokenStatus />
          )}
        </>
      )}
    </>
  );
};
