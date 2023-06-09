import { configureStore } from '@reduxjs/toolkit';
import oracleReducer from '../reducer/oracleReducer';

export default configureStore({
  reducer: {
    oracle: oracleReducer,
  },
});
