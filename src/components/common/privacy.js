import React from 'react';

export const PrivacyComponent = () => {
  return (
    <div className="mx-auto max-w-7xl text-center rounded-lg mb-10 border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-10 text-base font-medium text-white shadow-sm">
      <h2 className="font-semibold text-3xl">We Take Your Privacy Seriously</h2>
      <p className="text-sm mt-5 max-w-4xl mx-auto">
        We value your privacy and believe your right to control your data. You
        always have the right to request the deletion of your data from
        I-AM-HUMAN and our partner Fractal. To find out more, please read our
        documentation about your privacy and our approach to GDPR compliance.
      </p>
      <button
        onClick={() =>
          window.open(
            'https://i-am-human.gitbook.io/i-am-human-docs/technical-specs/pii-and-gdpr',
            '_blank'
          )
        }
        className="bg-white mt-5 rounded-lg text-purple-500 p-2 px-4"
      >
        Learn More
      </button>
    </div>
  );
};
