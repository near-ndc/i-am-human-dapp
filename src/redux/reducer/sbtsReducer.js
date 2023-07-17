import { createSlice } from '@reduxjs/toolkit';
import {
  ContractMethodNames,
  ReducerNames,
  TokenTypes,
} from '../../utils/constants';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';

const { app_contract } = getConfig();

export const sbtReducer = createSlice({
  name: [ReducerNames.SBT],
  initialState: {
    fvToken: null,
    kycToken: null,
    ogToken: null,
    vibeToken: null,
    regenToken: null,
  },
  reducers: {
    updateTokens: (state, action) => {
      const { type, value } = action.payload;
      switch (type) {
        case TokenTypes.FV:
          state.fvToken = value;
          break;
        case TokenTypes.KYC:
          state.kycToken = value;
          break;
        case TokenTypes.OG:
          state.ogToken = value;
          break;
        case TokenTypes.VIBE:
          state.vibeToken = value;
          break;
        case TokenTypes.REGEN:
          state.regenToken = value;
          break;
        default:
          break;
      }
    },
    // when burned or signed out
    removeAllTokens: (state, action) => {
      state.fvToken = null;
      state.kycToken = null;
      state.ogToken = null;
      state.vibeToken = null;
      state.regenToken = null;
    },
    revokeSBTs: (state, action) => {
      wallet.callMethod({
        contractId: app_contract,
        method: ContractMethodNames.BURN,
        args: {},
      });
    },
    soulTransfer: (state, action) => {
      wallet.callMethod({
        contractId: app_contract,
        method: ContractMethodNames.TRANSFER,
        args: { recipient: action.payload },
      });
    },
  },
});

export const { updateTokens, removeAllTokens, revokeSBTs, soulTransfer } =
  sbtReducer.actions;

export default sbtReducer.reducer;
