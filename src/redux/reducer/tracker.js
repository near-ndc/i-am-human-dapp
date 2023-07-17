import { createSlice } from '@reduxjs/toolkit';

export const trackerReducer = createSlice({
  name: 'progressTracker',
  initialState: {
    showTracker: true,
  },
  reducers: {
    updateTrackerStatus: (state, action) => {
      state.showTracker = action.payload;
    },
  },
});

export const { updateTrackerStatus } = trackerReducer.actions;

export default trackerReducer.reducer;
