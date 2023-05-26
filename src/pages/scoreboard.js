import React, { useCallback, useState } from 'react';
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { supabase } from '../utils/supabase';
import { CommunityDataKeys } from '../utils/campaign';

import { ScoreBoardTable } from '../components/pages/scoreboard/scoreboardTable';
import { CircleSpinner } from 'react-spinners-kit';

export const ScoreboardPage = ({ isSignedIn }) => {
  const ref = React.useRef();
  const [communities, setCommunities] = useState({ data: [], loading: true });

  const fetchCommunities = useCallback(async () => {
    setCommunities((d) => ({ ...d, loading: true }));
    const { data } = await supabase.select('scoreboard');
    const communityCounter = {};
    data.map((item) => {
      if (!communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]]) {
        communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] = 1;
      } else {
        communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] =
          communityCounter[item?.[CommunityDataKeys.COMMUNITY_NAME]] + 1;
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
    setCommunities({ data: arrayToSet, loading: false });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchCommunities();
  }, [fetchCommunities]);

  const { loading, data } = communities;

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 pt-10" ref={ref}>
      <Header />
      <div className="px-5 mt-[80px] md:mt-[100px] flex flex-col gap-y-32 mb-20">
        {loading ? (
          <p className="flex flex-wrap gap-2 items-center">
            Loading Community Scoreboard...{' '}
            <CircleSpinner size={20} color="blue" />
          </p>
        ) : (
          <ScoreBoardTable communities={data} />
        )}
      </div>
      <Footer />
    </div>
  );
};
