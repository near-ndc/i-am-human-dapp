import 'regenerator-runtime/runtime';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ReactGA from 'react-ga';

import { IndexPage } from './pages/index';
import { CommunityApplicationPage } from './pages/communtiyapplication';
import { ScoreboardPage } from './pages/scoreboard';
import RouteChangeTracker from './utils/routeChangeTracker';

const RedirectComponent = () => {
  return <Redirect to="/" />;
};

export function App({ isSignedIn }) {
  useEffect(() => {
    if (
      process.env.REACT_APP_ENV === 'prod' ||
      process.env.REACT_APP_ENV === 'dev'
    )
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  }, []);

  return (
    <>
      <Router>
        <RouteChangeTracker />
        <Switch>
          <Route exact path="/community-application">
            <CommunityApplicationPage isSignedIn={isSignedIn} />
          </Route>
          <Route exact path="/community-scoreboard">
            <ScoreboardPage isSignedIn={isSignedIn} />
          </Route>
          <Route exact path="/">
            <IndexPage isSignedIn={isSignedIn} />
          </Route>
          <Route path="*">
            <RedirectComponent />
          </Route>
        </Switch>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
