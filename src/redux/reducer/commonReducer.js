import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from '../../utils/constants';

export const commonReducer = createSlice({
  name: ReducerNames.COMMON,
  initialState: {
    isUserLogin: false,
    isAdmin: false,
    activePageIndex: null, // for verification screens
    isSuccessSBTPage: false, // to show success page
    showConfetti: false,
  },
  reducers: {
    updateUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
    },
    setActivePageIndex: (state, action) => {
      state.activePageIndex = action.payload;
    },
    setSuccessSBTPage: (state, action) => {
      state.isSuccessSBTPage = action.payload;
    },
    updateAdminLogin: (state, action) => {
      state.isAdmin = action.payload;
    },
    updateShowConfetti: (state, action) => {
      state.showConfetti = action.payload;
    },
  },
});

export const {
  updateUserLogin,
  setActivePageIndex,
  setSuccessSBTPage,
  updateAdminLogin,
  updateShowConfetti,
} = commonReducer.actions;

export default commonReducer.reducer;
