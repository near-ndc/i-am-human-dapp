import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from '../../utils/constants';

export const commonReducer = createSlice({
  name: ReducerNames.COMMON,
  initialState: {
    isUserLogin: false,
    isAdmin: false,
    activePageIndex: 1, // for verification screens
    isSuccessSBTPage: false, // to show success page
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
  },
});

export const {
  updateUserLogin,
  setActivePageIndex,
  setSuccessSBTPage,
  updateAdminLogin,
} = commonReducer.actions;

export default commonReducer.reducer;
