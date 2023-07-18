import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from '../../utils/constants';

export const oracleReducer = createSlice({
  name: ReducerNames.ORACLE,
  initialState: {
    responseData: null,
  },
  reducers: {
    updateResponse: (state, action) => {
      state.responseData = action.payload;
    },
  },
});

export const { updateResponse } = oracleReducer.actions;

export default oracleReducer.reducer;
