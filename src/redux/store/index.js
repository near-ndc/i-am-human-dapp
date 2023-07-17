import { configureStore } from '@reduxjs/toolkit';
import oracleReducer from '../reducer/oracleReducer';
import trackerReducer from '../reducer/tracker';
import { ReducerNames } from '../../utils/constants';
import sbtReducer from '../reducer/sbtsReducer';
import commonReducer from '../reducer/commonReducer';

export default configureStore({
  reducer: {
    [ReducerNames.ORACLE]: oracleReducer,
    [ReducerNames.SBT]: sbtReducer,
    [ReducerNames.COMMON]: commonReducer,
    [ReducerNames.PROGRESS]: trackerReducer,
  },
});
