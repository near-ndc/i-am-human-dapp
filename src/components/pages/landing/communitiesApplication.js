import React, { useState } from 'react';
import { CommunityApplicationPanel } from './communityApplicationPanel/index';

export const CommunitiesApplication = () => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  return (
    <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none pb-16 lg:px-0">
      <div>
        <div className="mt-6" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Community Application
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Create your own community on I-AM-HUMAN and have the ability to
            verify that all the members of your community are real humans !
          </p>

          <div className="mt-3">
            <a
              className="text-blue-500 underline"
              target="_blank"
              rel="noreferrer"
              href="https://i-am-human.gitbook.io/i-am-human-docs/the-soulbound-tokens/face-verification"
            >
              Learn More
            </a>
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                setIsOpenPanel(true);
              }}
              className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
            >
              Apply For Community SBT
            </button>
          </div>
          <CommunityApplicationPanel
            open={isOpenPanel}
            setOpen={setIsOpenPanel}
          />
        </div>
      </div>
    </div>
  );
};
