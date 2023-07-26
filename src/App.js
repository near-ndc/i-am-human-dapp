import 'regenerator-runtime/runtime';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import ScoreboardPage from './pages/Scoreboard';
import CommunitySBTPage from './pages/CommunitySBT';
import { URLs } from './utils/constants';
import ProgressTracker from './components/common/ProgressTracker';
import CustomHeader from './components/common/Header';
import CustomFooter from './components/common/Footer';

const Wrapper = ({ children }) => {
  return (
    <>
      <ProgressTracker />
      <CustomHeader />
      {children}
      <CustomFooter />
    </>
  );
};

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path={URLs.SCOREBOARD}
            element={
              <Wrapper>
                <ScoreboardPage />
              </Wrapper>
            }
          />

          <Route
            exact
            path={URLs.SBTs}
            element={
              <Wrapper>
                <CommunitySBTPage />
              </Wrapper>
            }
          />

          <Route
            exact
            path={URLs.HOME}
            element={
              <Wrapper>
                <IndexPage />
              </Wrapper>
            }
          />

          <Route
            path="*"
            element={
              <Wrapper>
                <IndexPage />
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
