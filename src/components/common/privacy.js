import React from 'react';
import { PRIVACY_CONTENT } from '../../utils/constants';

export const PrivacyComponent = () => {
  return (
    <div className="mx-auto max-w-7xl text-center rounded-lg mb-10 border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-10 text-base font-medium text-white shadow-sm">
      <h2 className="font-semibold text-3xl">{PRIVACY_CONTENT.title}</h2>
      <p className="text-sm mt-5 max-w-4xl mx-auto">
        {PRIVACY_CONTENT.description}
      </p>
      <button
        onClick={() =>
          window.open(
            'https://i-am-human.gitbook.io/i-am-human-docs/privacy/date-use-and-gdpr',
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
