import React from 'react';

export const PrivacyComponent = () => {
  return (
    <div className="mx-auto max-w-7xl text-center rounded-lg mb-10 border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-10 text-base font-medium text-white shadow-sm">
      <h2 className="font-bold text-3xl">We Take Your Privacy Seriously</h2>
      <p className="text-sm mt-5 max-w-4xl mx-auto">
        You have always have the right to request the deletion your data anytime
        from I-AM-HUMAN and our partner Fractal To find out more, please read
        our documentations about your privacy and our GDPR compliance.
      </p>
      <button className="bg-white mt-5 rounded-lg text-purple-500 p-2 px-4">
        Learn More
      </button>
    </div>
  );
};
