import { configureStore } from '@reduxjs/toolkit';
import oracleReducer from '../reducer/oracleReducer';
import trackerReducer from '../reducer/tracker';

export default configureStore({
  reducer: {
    oracle: oracleReducer,
    progressTracker: trackerReducer,
  },
});
