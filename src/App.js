import 'regenerator-runtime/runtime';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import ScoreboardPage from './pages/Scoreboard';
import CommunitySBTPage from './pages/CommunitySBT';
import { URLs } from './utils/constants';
import ProgressTracker from './components/common/ProgressTracker';
import CustomHeader from './components/common/Header';
import CustomFooter from './components/common/Footer';
import ActivatePage from './pages/Activate';
import { wallet } from '.';
import { useDispatch } from 'react-redux';
import { updateUserLogin } from './redux/reducer/commonReducer';

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
  const dispatch = useDispatch();
  useEffect(() => {
    wallet
      .startUp()
      .then((value) => {
        dispatch(updateUserLogin(value));
      })
      .catch(() => {
        dispatch(updateUserLogin(false));
      });
  });

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
          <Route
            path={URLs.ACTIVATE}
            element={
              <Wrapper>
                <ActivatePage />
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
