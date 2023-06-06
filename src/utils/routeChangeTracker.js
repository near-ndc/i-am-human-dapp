import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

const RouteChangeTracker = ({ history }) => {
  history.listen((location, _action) => {
    const currentPath = location.pathname + location.search;

    ReactGA.set({ page: currentPath });
    ReactGA.pageview(currentPath);
  });

  return <></>;
};

export default withRouter(RouteChangeTracker);
