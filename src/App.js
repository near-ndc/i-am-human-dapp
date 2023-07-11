import 'regenerator-runtime/runtime';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { IndexPage } from './pages/index';
import { CommunityApplicationPage } from './pages/communtiyapplication';
import { ScoreboardPage } from './pages/scoreboard';
import { CommunitySBTPage } from './pages/communitySBT';
import { URLs } from './utils/constants';

const RedirectComponent = () => {
  return <Redirect to="/" />;
};

export function App({ isSignedIn }) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={URLs.APPLICATION}>
            <CommunityApplicationPage isSignedIn={isSignedIn} />
          </Route>
          <Route exact path={URLs.SCOREBOARD}>
            <ScoreboardPage isSignedIn={isSignedIn} />
          </Route>
          <Route exact path={URLs.SBTs}>
            <CommunitySBTPage />
          </Route>
          <Route exact path={URLs.HOME}>
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
