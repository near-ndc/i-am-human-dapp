import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames, TokenTypes } from '../../utils/constants';

export const sbtReducer = createSlice({
  name: [ReducerNames.SBT],
  initialState: {
    fvTokens: null,
    kycTokens: null,
    ogTokens: null,
    vibeTokens: null,
  },
  reducers: {
    updateTokens: (state, action) => {
      const { type, value } = action.payload;
      switch (type) {
        case TokenTypes.FV:
          state.fvTokens = value;
          break;
        case TokenTypes.KYC:
          state.kycTokens = value;
          break;
        case TokenTypes.OG:
          state.ogTokens = value;
          break;
        case TokenTypes.VIBE:
          state.vibeTokens = value;
          break;
        default:
          break;
      }
    },
    // when burned or signed out
    removeAllTokens: (state, action) => {
      state.fvTokens = null;
      state.kycTokens = null;
      state.ogTokens = null;
      state.vibeTokens = null;
    },
  },
});

export const { updateTokens, removeAllTokens } = sbtReducer.actions;

export default sbtReducer.reducer;
