import React, { useState } from "react";

import { VerifyPhoneAndEmail } from "./applyCommunityVerify/verifyPhoneAndEmail";
import { Panel } from "../../common/panel";

export const ApplyCommunityVerify = ({ open, onClose,userData }) => {
  const steps = {
    0: "5%",
    1: "10%",
    2: "50%",
    3: "100%",
  };
  const [showStep, setShowStep] = useState(3);
  return (
    <Panel
      open={open}
      onClose={onClose}
      title={"Apply for Community Verification"}
    >
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
            Apply For Community Verification
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
            <VerifyPhoneAndEmail userData={userData} setShowStep={setShowStep} />
          </>
        )}
        {showStep === 3 && (
          <>
            <p className="text-3xl font-semibold mt-5">
              Apply for community verification
            </p>
            <div className="bg-gray-100 p-3 rounded">
              <div className="ml-auto w-[fit-content] text-center space-x-2">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <p className="mx-auto w-[fit-content]">Apply</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Panel>
  );
};
