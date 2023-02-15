import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";

import { VerifyPhoneAndEmail } from "./applyCommunityVerify/verifyPhoneAndEmail";
import { Panel } from "../../common/panel";
import { wallet } from "../../../index";
import { toast } from "react-toastify";

export const ApplyCommunityVerify = ({ open, onClose, userData }) => {
  const steps = {
    0: "5%",
    1: "10%",
    2: "50%",
    3: "100%",
  };
  const [showStep, setShowStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [telegramData, setTelegramData] = useState({
    email: "",
    phone: "",
  });

  const apply = async () => {
    setLoading(true);
    const updateData = {
      telegram_number: telegramData.phone,
      og_sbt_application: "Application Submitted",
    };
    if (!Boolean(userData?.email)) {
      updateData.email = telegramData.email;
    }
    try {
      const { error } = await supabase
        .from("users")
        .update(updateData)
        .match({ wallet_identifier: wallet.accountId });
      if (error) {
        throw new Error("");
      } else {
        onClose?.();
        toast.success("Applied for community SBT");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch {
      toast.error("An error occured while applying for community SBT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel open={open} onClose={onClose} title={"Apply for an OG SBT here"}>
      <div>
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: steps[showStep] }}
          />
        </div>
        <div className="mt-2 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
          <div className={showStep >= 0 && "text-indigo-600"}>
            Create a telegram account
          </div>
          <div className={`${showStep > 1 && "text-indigo-600"} text-center`}>
            Authorize Phone Number
          </div>
          <div className={`${showStep > 2 && "text-indigo-600"} text-right`}>
            Apply for OG SBT
          </div>
        </div>
        {showStep === 0 && (
          <div className="bg-gray-100 p-3 mt-4 rounded">
            <p className="text-xl">Do you have a telegram account ?</p>
            <div className="ml-auto w-[fit-content] text-center space-x-2">
              <button
                onClick={() => setShowStep(1)}
                type="button"
                className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <p className="mx-auto w-[fit-content]">No</p>
              </button>
              <button
                onClick={() => setShowStep(2)}
                type="button"
                className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <p className="mx-auto w-[fit-content]">Yes</p>
              </button>
            </div>
          </div>
        )}
        {showStep === 1 && (
          <>
            <p className="text-3xl font-semibold mt-5">
              Sign up and get a telegram account
            </p>
            <button
              onClick={() => {
                window.open("https://web.telegram.org/k/", "_blank");
              }}
              className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 mb-3"
            >
              Sign up with telegram
            </button>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xl">Created your account on telegram yet ?</p>
              <div className="ml-auto w-[fit-content] text-center space-x-2">
                <button
                  onClick={() => setShowStep(2)}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <p className="mx-auto w-[fit-content]">Yes</p>
                </button>
              </div>
            </div>
          </>
        )}
        {showStep === 2 && (
          <>
            <VerifyPhoneAndEmail
              setTelegramData={setTelegramData}
              userData={userData}
              setShowStep={setShowStep}
            />
          </>
        )}
        {showStep === 3 && (
          <>
            <p className="text-3xl font-semibold mt-5 mb-2">Apply for OG SBT</p>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-lg">
                - To qualify for an OG SBT you need to have a human-readable
                account created in 2022 or earlier.
                <br /> - Either apply here by submitting your phone number that
                you use for your Telegram account. Or by meeting up with one of
                our Stewards in real life or on a video call. If you don't know
                who we are then you can find us in the NDC Technical Working
                Group on Telegram.
              </p>
              <div className="ml-auto w-[fit-content] text-center space-x-2">
                <button
                  onClick={apply}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-28 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading && (
                    <div className="w-[fit-content] mx-auto">
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 text-gray-200 animate-spin fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}

                  <p className="mx-auto w-[fit-content]">
                    {loading ? "Applying" : "Apply"}
                  </p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Panel>
  );
};
