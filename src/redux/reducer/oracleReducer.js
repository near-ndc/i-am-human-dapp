import { createSlice } from '@reduxjs/toolkit';

export const oracleReducer = createSlice({
  name: 'oracle',
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
