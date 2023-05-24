import React from 'react';

export const IsSignedOutLanding = ({ setIsStarted }) => (
  <div className="p-3 rounded text-center">
    <p className="text-xl">Unlock Your Ecosystem</p>
    <p className="text-m my-5">
      This is your launchpad for several different SBTs, each of which will
      identify you as a human. With enough of them you will have a strong
      proof-of-personhood, which can give you access to vote, to apps, to DAOs
      and more.
    </p>
    <button
      onClick={() => setIsStarted(true)}
      className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
    >
      Get Started
    </button>
    <button
      onClick={() =>
        window.open('https://i-am-human.gitbook.io/i-am-human-docs/', '_blank')
      }
      className="inline-flex ml-3 rounded-md border border-transparent bg-slate-200 px-4 py-2 text-base font-light text-black shadow-sm"
    >
      Learn More
    </button>
  </div>
);
