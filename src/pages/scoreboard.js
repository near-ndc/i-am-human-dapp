import React, { useCallback, useState } from 'react';
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { supabase } from '../utils/supabase';

import { ScoreBoardTable } from '../components/pages/scoreboard/scoreboardTable';

export const ScoreboardPage = ({ isSignedIn }) => {
  const ref = React.useRef();
  const [communities, setCommunities] = useState({ data: [], loading: true });

  const fetchCommunities = useCallback(async () => {
    setCommunities((d) => ({ ...d, loading: true }));
    const { data } = await supabase.select('scoreboard');
    const communityCounter = {};
    data.map((item) => {
      if (!communityCounter[item?.['community-name']]) {
        communityCounter[item?.['community-name']] = 1;
      } else {
        communityCounter[item?.['community-name']] =
          communityCounter[item?.['community-name']] + 1;
      }
    });
    const arrayToSet = Object.entries(communityCounter).map(([key, val]) => {
      let community_data = data.find((item) => item['community-name'] === key);
      let objectToReturn = {};
      objectToReturn['vertical'] = community_data['community-vertical'];
      objectToReturn['name'] = community_data['community-name'];
      objectToReturn['usercount'] = val;
      objectToReturn['id'] = 'id' + Math.random().toString(16).slice(2);
      return objectToReturn;
    });
    setCommunities({ data: arrayToSet, loading: false });
  }, []);

  React.useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetchCommunities();
  }, [fetchCommunities]);

  const { loading, data } = communities;
  return (
    <div ref={ref}>
      <Header />
      <div className="lg:mx-auto mt-14 lg:max-w-7xl lg:px-8 px-6">
        <>
          {loading ? (
            <p>Loading Community Scoreboard</p>
          ) : (
            <ScoreBoardTable communities={data} />
          )}
        </>
      </div>
      <Footer />
    </div>
  );
};
