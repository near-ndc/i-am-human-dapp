import React, { useCallback, useEffect, useState } from 'react';
import { CommunityApplicationPanel } from './communityApplicationPanel/index';
import { supabase } from '../../../utils/supabase';
import { wallet } from '../../..';

export const CommunitiesApplication = () => {
  const [communityApplication, setCommunityApplication] = useState(null);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const fetchCommunities = useCallback(async () => {
    const { data, error } = await supabase.select('community-artwork', {
      account: wallet.accountId,
    });
    console.log(data);
    setCommunityApplication(data?.[0]);
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return (
    <div className="mx-auto pt-16 pb-16">
      <div>
        <div className="mt-6" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Community SBT Application
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
            {communityApplication ? (
              <p>
                You have applied for community application , we will review your
                application and get back to you soon
              </p>
            ) : (
              <button
                onClick={() => {
                  setIsOpenPanel(true);
                }}
                className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
              >
                Apply For Community SBT
              </button>
            )}
          </div>
          <CommunityApplicationPanel
            open={isOpenPanel}
            fetchCommunities={fetchCommunities}
            setOpen={setIsOpenPanel}
          />
        </div>
      </div>
    </div>
  );
};
