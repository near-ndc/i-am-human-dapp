import React from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

export const VerifyPhoneAndEmail = () => {
  const [value, setValue] = React.useState("+1");
  const [otp, setOtp] = React.useState("");

  const sendOtp = () => {
   
  };

  return (
    <div className="bg-gray-100 p-3 rounded">
      <PhoneInput
        className="p-3 bg-white m-2"
        value={value}
        onChange={(e) => setValue(e)}
        placeholder="Enter Your phone number"
      />
      {!Boolean(isPossiblePhoneNumber(value ?? "")) && (
        <p className="text-xs text-red-500">
          Please provide a valid phone number
        </p>
      )}
      <div className="ml-auto w-[fit-content] text-center space-x-2">
        <button
          onClick={() => {
            // setShowStep(3);
          }}
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 w-20 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <p className="mx-auto w-[fit-content]">Verify</p>
        </button>
      </div>
    </div>
  );
};
