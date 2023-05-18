import React, { useCallback, useState } from 'react';
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { supabase } from '../utils/supabase';
import { CommunityDataKeys } from '../utils/campaign';

import { ScoreBoardTable } from '../components/pages/scoreboard/scoreboardTable';
import { CircleSpinner } from 'react-spinners-kit';
import { VerticalScoreboard } from '../components/pages/scoreboard/verticalScoreboard';
import { UserDataTable } from '../components/pages/scoreboard/userDataTable';

export const ScoreboardPage = ({ isSignedIn }) => {
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
    window.scrollTo(0, 0);
    fetchCommunities();
  }, [fetchCommunities]);

  const { loading, data, vertical, allUserData } = communities;

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 pt-10" ref={ref}>
      <Header />
      <div className="lg:mx-auto mt-14 lg:max-w-7xl lg:px-8 px-6">
        <>
          {loading ? (
            <p className="flex flex-wrap gap-2 items-center">
              Loading Community Scoreboard...{' '}
              <CircleSpinner size={20} color="blue" />
            </p>
          ) : (
            <div className="space-y-4 pb-4">
              <ScoreBoardTable communities={data} />
              <VerticalScoreboard communities={vertical} />
              <UserDataTable userData={allUserData} />
            </div>
          )}
        </>
      </div>
      <Footer />
    </div>
  );
};
