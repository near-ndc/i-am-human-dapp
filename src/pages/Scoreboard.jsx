import React, { useCallback, useState } from 'react';

import { supabase } from '../utils/supabase';
import { CommunityDataKeys } from '../utils/constants';

import ScoreBoardTable from '../components/scoreboard/ScoreboardTable';
import { CircleSpinner } from 'react-spinners-kit';
import VerticalScoreboard from '../components/scoreboard/VerticalScoreboard';
import UserDataTable from '../components/scoreboard/UserDataTable';
import moment from 'moment';

const ScoreboardPage = () => {
  const ref = React.useRef();
  const [communities, setCommunities] = useState({
    data: [],
    loading: true,
    vertical: [],
    allUserData: [],
  });

  const fetchCommunities = useCallback(async () => {
    setCommunities((d) => ({ ...d, loading: true }));
    const { data } = await supabase.select('scoreboard');
    const communityCounter = {};
    const verticalCounter = {};
    data.map((item) => {
      if (!communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]]) {
        communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] = 1;
      } else {
        communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] =
          communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] + 1;
      }
      if (!verticalCounter[item?.[CommunityDataKeys.COMMUNITY_VERTICAL]]) {
        verticalCounter[item?.[CommunityDataKeys.COMMUNITY_VERTICAL]] = 1;
      } else {
        verticalCounter[item?.[CommunityDataKeys.COMMUNITY_VERTICAL]] =
          verticalCounter[item?.[CommunityDataKeys.COMMUNITY_VERTICAL]] + 1;
      }
    });
    const arrayToSet = Object.entries(communityCounter).map(([key, val]) => {
      let community_data = data.find(
        (item) => item[CommunityDataKeys.COMMUNITY_NAME] === key
      );
      let objectToReturn = {};
      objectToReturn['vertical'] =
        community_data[CommunityDataKeys.COMMUNITY_VERTICAL];
      objectToReturn['name'] = community_data[CommunityDataKeys.COMMUNITY_NAME];
      objectToReturn['usercount'] = val;
      objectToReturn['id'] = 'id' + Math.random().toString(16).slice(2);
      return objectToReturn;
    });
    const verticalToSet = Object.entries(verticalCounter).map(([key, val]) => {
      return { vertical: key, usercount: val };
    });
    setCommunities({
      data: arrayToSet,
      loading: false,
      vertical: verticalToSet,
      allUserData: data,
    });
  }, []);

  React.useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const { loading, data, vertical, allUserData } = communities;

  const WeeklyUserGrowth = () => {
    const weeklyUsers = allUserData?.filter(
      (item) =>
        moment(item?.created_at).unix() >= moment().subtract(7, 'days').unix()
    );

    return (
      <div className="flex gap-2 text-2xl text-center font-semibold leading-6 text-gray-900">
        <h1>Weekly User Growth:</h1>
        <p>{weeklyUsers.length} users</p>
      </div>
    );
  };

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5" ref={ref}>
      <div className="lg:mx-auto mt-20 lg:max-w-7xl lg:px-8 px-6 mb-20">
        <>
          {loading ? (
            <p className="flex flex-wrap gap-2 items-center">
              Loading Community Scoreboard...{' '}
              <CircleSpinner size={20} color="blue" />
            </p>
          ) : (
            <div className="space-y-5 pb-4 text-center">
              <div className="mx-auto max-w-7xl text-center rounded-lg mb-10 border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-10 text-base font-medium text-white shadow-sm">
                <h2 className="font-semibold text-3xl">
                  I-AM-HUMAN Onboarding Competition{' '}
                </h2>
                <p className="text-sm mt-5 max-w-4xl mx-auto">
                  Get your personal tracking links to onboard humans and see
                  scores here. For more information, join this telegram group
                  for competition details.
                </p>
                <div className="flex justify-center gap-10">
                  <button
                    onClick={() =>
                      window.open('https://t.me/+fcNhYGxK891lMjMx', '_blank')
                    }
                    className="bg-white mt-5 rounded-lg text-purple-500 p-2 px-4"
                  >
                    Join the Community
                  </button>
                  <button
                    onClick={() =>
                      window.open('https://t.me/+gVXWvooKWzozNmE0', '_blank')
                    }
                    className="border border-white border-2 mt-5 rounded-lg text-white-500 p-2 px-4"
                  >
                    Learn about the Competition
                  </button>
                </div>
              </div>
              <div className="mt-20 space-y-10">
                <ScoreBoardTable communities={data} />
                <VerticalScoreboard communities={vertical} />
                <WeeklyUserGrowth />
                <UserDataTable userData={allUserData} />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ScoreboardPage;
