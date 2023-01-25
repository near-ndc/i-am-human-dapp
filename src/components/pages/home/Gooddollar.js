import React from "react";
import {
  createLoginLink,
  parseLoginResponse,
  LoginButton,
} from "@gooddollar/goodlogin-sdk";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export const Gooddollar = () => {
  const gooddollarLink = createLoginLink({
    v: "I-AM-HUMAN-DAPP",
    web: "https://i-am-human.dapp/",
    id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
    r: ["mobile", "location", "email", "name"],
    rdu: window.location.href,
  });
  const [gooddollarData, setGooddollarData] = React.useState(null);

  const { values, handleSubmit, handleBlur, handleChange, setValues } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        gDollarAccount: "",
        status: "",
      },
    });

  const handleValues = (key) => ({
    value: values[key],
    disabled: true,
    onChange: handleChange(key),
    onBlur: handleBlur(key),
  });

  return (
    <div className="p-2 pt-5 w-full">
      <p className="text-3xl font-semibold">Get Verified and Apply</p>
      <p className="md:w-[70%] text-sm font-light italic mt-2">
        Experimental feature. GoodDollar is a web3 protocol which whitelists its
        users with a simple face scan. Images are not stored, only a “hash” of
        your face for comparison with other users.
      </p>
      <div className="md:w-[70%]">
        <p className="text-3xl font-semibold mt-5">
          Step 1: Sign up and get face-verified with GoodDollar
        </p>
        <p className="text-sm font-light italic mt-2">
          In this step you will be asked to create an account by signing up with
          GoodDollar. Once you have access to their wallet you need to click the
          “Claim” button in the center of the screen, and follow the prompts to
          scan your face . If you are already a GoodDollar claimer you can skip
          this step. Note: We recommend using a smartphone for this step. This
          may be geo-blocked for certain countries.
        </p>
        <button
          onClick={() => {
            window.open("https://wallet.gooddollar.org", "_blank");
          }}
          className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right"
        >
          Sign up with G$
        </button>
      </div>
      <div className="md:w-[70%] mt-14">
        <p className="text-3xl font-semibold ">
          Step 2: Authorize NDC to access your GD profile
        </p>
        <p className="text-sm font-light italic mt-2">
          Log in again, this time authorizing us to verify that you were
          whitelisted and therefore also verified as a unique human. Note: This
          feature doesn’t work on phones yet, and is also geo-blocked for
          certain countries.
        </p>

        <LoginButton
          onLoginCallback={async (data) => {
            console.log(data);
            try {
              if (data.error) return alert("Login request denied !");
              parseLoginResponse(data).then((d) => {
                setGooddollarData(d);
                setValues({
                  name: d?.fullName?.value,
                  email: d?.email?.value,
                  phone: d?.mobile?.value,
                  gDollarAccount: d?.walletAddress?.value,
                  status: d?.isAddressWhitelisted?.value
                    ? "Whitelisted"
                    : "Not Whitelisted",
                });
              });
            } catch (e) {
              console.log(e);
            }
          }}
          className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right"
          gooddollarlink={gooddollarLink}
          rdu="gasdasd"
        >
          Authorize G$
        </LoginButton>
      </div>
      {console.log(values)}
      <div className="mt-14">
        <p className="text-3xl font-semibold ">
          Step 3: Apply for a Community SBT
        </p>
        <p className="md:w-[70%] text-sm font-light italic mt-2">
          Once you passed step 1 and 2 your information will be populated here
          and you will be able to apply for a Community SBT.
        </p>
        <form
          disabled={false}
          className="font-light tracking-wider md:w-[70%] space-y-2 mt-3 mb-16"
        >
          <div className="flex items-center justify-between">
            <p>Name:</p>
            <input
              className="w-[88%] bg-gray-100 p-1 rounded px-3"
              placeholder="Name"
              {...handleValues("name")}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Email:</p>
            <input
              className="w-[88%] bg-gray-100 p-1 rounded px-3"
              placeholder="Email"
              {...handleValues("email")}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Phone:</p>
            <input
              className="w-[88%] bg-gray-100 p-1 rounded px-3"
              placeholder="Phone"
              {...handleValues("phone")}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>G$ Account:</p>
            <input
              className="w-[88%] bg-gray-100 p-1 rounded px-3"
              placeholder="Account Address"
              {...handleValues("gDollarAccount")}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Status:</p>
            <input
              className="w-[88%] bg-gray-100 p-1 rounded px-3"
              placeholder="Status"
              {...handleValues("status")}
            />
          </div>
          <button
            onClick={() => {
              toast.info("This feature is yet to be implemented.");
            }}
            type="button"
            className="bg-blue-600 mt-3 text-white rounded shadow-lg font-medium w-[fit-content] text-sm px-4 py-2 float-right"
          >
            Apply for SBT
          </button>
        </form>
      </div>
      {/* {gooddollarData ? (
        <>
          <div>
            <p>Congrates you're now verified with gooddollar</p>
            <p>Name : {gooddollarData?.fullName?.value}</p>
            <p>Wallet Address : {gooddollarData?.walletAddress?.value}</p>
            <p>Mobile Number : {gooddollarData?.mobile?.value}</p>
            <p>Location : {gooddollarData?.location?.value}</p>
            <p>Email : {gooddollarData?.email?.value}</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setGooddollarData(null);
                  window.location.href = window.location.origin;
                }}
                className="text-white text-lg p-4 my-10 bg-blue-600 rounded"
              >
                Logout
              </button>
              <button
                disabled={false}
                className="bg-blue-600 text-white rounded shadow-lg mx-auto font-medium w-[fit-content] text-sm p-5"
              >
                Mint FaceSBT
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <LoginButton
            onLoginCallback={async (data) => {
              console.log(data);
              try {
                if (data.error) return alert("Login request denied !");
                parseLoginResponse(data).then((d) => {
                  setGooddollarData(d);
                });
              } catch (e) {
                console.log(e);
              }
            }}
            className="text-white text-lg p-4 my-10 bg-blue-600 rounded"
            gooddollarlink={gooddollarLink}
            rdu="gasdasd"
          >
            Loggin With GOODDOLLAR
          </LoginButton>
          <button
            disabled={false}
            className="bg-gray-400 text-white rounded shadow-lg mx-auto font-medium w-[fit-content] text-sm p-5"
          >
            Mint FaceSBT
          </button>
        </div>
      )} */}
      <div className="p-4 shadow rounded-lg w-full md:w-[60%] w-full">
        <p className="text-sm italic">
          Experimental feature. GoodDollar is a web3 protocol which whitelists
          its users with a simple face scan. Images are not stored, only a
          “hash” of your face for comparison with other users. If you have an
          account with GoodDollar then you will be able to mint a ‘verified
          unique’ SBT here. If you don’t yet have an account, please sign up for
          one first at www.gooddollar.org.{" "}
          <span className="font-semibold">
            This feature doesn't work in phone
          </span>
        </p>
      </div>
    </div>
  );
};
