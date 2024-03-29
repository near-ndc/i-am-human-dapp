import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ContractMethodNames,
  ReducerNames,
  TokenTypes,
} from '../../utils/constants';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';
import { decodeBase64 } from '../../utils/utilityFunctions';

const { app_contract } = getConfig();

export const revokeSBTs = createAsyncThunk('SBT/revokeSBTs', async () => {
  try {
    const response = await wallet.callMethod({
      contractId: app_contract,
      method: ContractMethodNames.BURN,
      args: {},
    });
    return response;
  } catch (error) {
    console.error('Error occured in revoking user tokens: ', error);
    throw error;
  }
});

export const soulTransfer = createAsyncThunk(
  'SBT/soulTransfer',
  async (address) => {
    try {
      const response = await wallet.callMethod({
        contractId: app_contract,
        method: ContractMethodNames.TRANSFER,
        args: { recipient: address },
      });
      return response;
    } catch (error) {
      console.error('Error occured in transferring user tokens: ', error);
      throw error;
    }
  }
);

export const sbtReducer = createSlice({
  name: [ReducerNames.SBT],
  initialState: {
    fvToken: null,
    kycToken: null,
    ogToken: null,
    vibeToken: null,
    regenToken: null,
    isLoading: false,
    error: null,
    tokenRemoveSuccess: false,
    continueLoop: false, // for transfer and burn
    isUserHuman: false, // true if user has any SBT Token
    kudosToken: null,
    ndcContributor: null,
    ndcChampion: null,
    gwgCoreContributor: null,
    modToken: null,
    iVotedToken: null,
    coaToken: null,
    homToken: null,
    tcToken: null,
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
        case TokenTypes.KUDOS:
          state.kudosToken = value;
          break;
        case TokenTypes.GWG__Core_Contributor:
          state.gwgCoreContributor = value;
          break;
        case TokenTypes.NDC_Champion:
          state.ndcChampion = value;
          break;
        case TokenTypes.NDC_Contributor:
          state.ndcContributor = value;
          break;
        case TokenTypes.MOD:
          state.modToken = value;
          break;
        case TokenTypes.I_VOTED:
          state.iVotedToken = value;
          break;
        case TokenTypes.CoA:
          state.coaToken = value;
          break;
        case TokenTypes.HoM:
          state.homToken = value;
          break;
        case TokenTypes.TC:
          state.tcToken = value;
          break;
        default:
          break;
      }
      state.isUserHuman =
        state.fvToken ||
        state.kycToken ||
        state.ogToken ||
        state.vibeToken ||
        state.regenToken ||
        state.kudosToken ||
        state.ndcChampion ||
        state.ndcContributor ||
        state.gwgCoreContributor ||
        state.modToken ||
        state.iVotedToken ||
        state.coaToken ||
        state.homToken ||
        state.tcToken;
    },
    handleErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    // when burned or signed out
    removeAllTokens: (state, action) => {
      state.fvToken = null;
      state.kycToken = null;
      state.ogToken = null;
      state.vibeToken = null;
      state.regenToken = null;
      state.kudosToken = null;
      state.gwgCoreContributor = null;
      state.ndcChampion = null;
      state.ndcContributor = null;
      state.modToken = null;
      state.iVotedToken = null;
      state.tcToken = null;
      state.coaToken = null;
      state.homToken = null;
    },
    updateTokenRemoveStatus: (state, action) => {
      state.tokenRemoveSuccess = !state.tokenRemoveSuccess;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(revokeSBTs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.tokenRemoveSuccess = false;
        state.continueLoop = false;
      })
      .addCase(revokeSBTs.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = decodeBase64(action.payload?.status?.SuccessValue);
        if (response === 'false' || response === false) {
          state.continueLoop = true;
        } else if (response === 'true' || response === true) {
          state.tokenRemoveSuccess = true;
        }
      })
      .addCase(revokeSBTs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(soulTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.tokenRemoveSuccess = false;
        state.continueLoop = false;
      })
      .addCase(soulTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = decodeBase64(
          action.payload?.status?.SuccessValue
        )?.[1];
        if (response === 'false' || response === false) {
          state.continueLoop = true;
        } else if (response === 'true' || response === true) {
          state.tokenRemoveSuccess = true;
        }
      })
      .addCase(soulTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateTokens,
  removeAllTokens,
  handleErrorMessage,
  updateTokenRemoveStatus,
} = sbtReducer.actions;

export default sbtReducer.reducer;
