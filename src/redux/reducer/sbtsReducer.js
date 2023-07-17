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
    fvTokens: null,
    kycTokens: null,
    ogTokens: null,
    vibeTokens: null,
    regenTokens: null,
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
        case TokenTypes.REGEN:
          state.regenTokens = value;
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
      state.regenTokens = null;
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
