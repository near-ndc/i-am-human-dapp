import React from "react";
import {
  createLoginLink,
  parseLoginResponse,
  LoginButton,
} from "@gooddollar/goodlogin-sdk";

export const Gooddollar = () => {
  const gooddollarLink = createLoginLink({
    v: "Google",
    web: "https://gooddollar.netlify.app/",
    id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
    r: ["mobile", "location", "email", "name"],
    rdu: window.location.href,
  });
  const [gooddollarData, setGooddollarData] = React.useState(null);

  return (
    <div className="p-2">
      <p className="text-3xl font-semibold">Login with Gooddollar</p>
      {gooddollarData ? (
        <>
          <div>
            <p>Congrates you're now verified with gooddollar</p>
            <p>Name : {gooddollarData?.fullName?.value}</p>
            <p>Wallet Address : {gooddollarData?.walletAddress?.value}</p>
            <p>Mobile Number : {gooddollarData?.mobile?.value}</p>
            <p>Location : {gooddollarData?.location?.value}</p>
            <p>Email : {gooddollarData?.email?.value}</p>
            <button
              onClick={() => {
                setGooddollarData(null);
                window.location.href = window.location.origin;
              }}
              className="text-white text-lg p-4 my-10 bg-blue-600 rounded-lg"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
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
            className="text-white text-lg p-4 my-10 bg-blue-600 rounded-lg"
            gooddollarlink={gooddollarLink}
            rdu="gasdasd"
          >
            Loggin With GOODDOLLAR
          </LoginButton>
        </>
      )}
      <div className="p-4 shadow rounded-lg w-full md:w-[60%] w-full">
        <p className="text-sm italic">
          Experimental feature. GoodDollar is a web3 protocol which whitelists
          its users with a simple face scan. Images are not stored, only a
          “hash” of your face for comparison with other users. If you have an
          account with GoodDollar then you will be able to mint a ‘verified
          unique’ SBT here. If you don’t yet have an account, please sign up for
          one first at www.gooddollar.org. {' '}
          <span className="font-semibold">
            This feature doesn't work in phone
          </span>
        </p>
      </div>
    </div>
  );
};
