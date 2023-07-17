import React, { useEffect } from 'react';
import { wallet } from '../../index';
import { getConfig } from '../../utils/config';
import { toast } from 'react-toastify';
import EmptyImage from '../../images/empty.png';
import BgImage from '../../images/emptySBTBg.png';
import { isNumber } from '../../utils/utilityFunctions';
import { LSKeys, ReducerNames, TokenTypes } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokens } from '../../redux/reducer/sbtsReducer';
import TokensGrid from '../../components/common/TokensGrid';
import { setActivePageIndex } from '../../redux/reducer/commonReducer';

export const Home = () => {
  const { fvTokens, kycTokens, ogTokens, regenTokens } = useSelector(
    (state) => state[ReducerNames.SBT]
  );
  const { activePageIndex } = useSelector(
    (state) => state[ReducerNames.COMMON]
  );
  const dispatch = useDispatch();
  const { app_contract, fractal_contract, og_contract, regen_issuer_contract } =
    getConfig();
  useEffect(() => {
    // fetching only when logged in (without steps) state active
    if (!isNumber(activePageIndex)) {
      fetchOGSBTTokens();
      fetchTokens();
      fetchRegenToken();
    }
  }, [activePageIndex]);

  const fetchOGSBTTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: og_contract, // issuer is community sbt contract
        },
      });

      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => OG token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.OG, value: token }));
          }
          // if class = 2 => Vibe token
          if (token.metadata.class === 2) {
            dispatch(updateTokens({ type: TokenTypes.VIBE, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching OG Token details');
    }
  };

  const fetchRegenToken = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: regen_issuer_contract,
        },
      });

      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => Regen token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.REGEN, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching Regen SBT details');
    }
  };

  const fetchTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: fractal_contract, // issuer is fractal
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => FV token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.FV, value: token }));
          } else {
            dispatch(updateTokens({ type: TokenTypes.KYC, value: token }));
          }
        }
      } else {
        // user logged in, no tokens found, setting LS to show success SBT page whenever tokens exists
        localStorage.setItem(LSKeys.SHOW_SBT_PAGE, true);
      }
    } catch (error) {
      toast.error(
        'An error occured while fetching face verification SBT details'
      );
    }
  };

  return (
    <div className="mb-20">
      <h1 className="text-center text-2xl font-semibold mb-10">
        My I-AM-HUMAN Soul Bound Tokens
      </h1>
      <div className="flex flex-col gap-32">
        {!fvTokens && !kycTokens && !ogTokens && !regenTokens ? (
          <div>
            <div
              style={{ backgroundImage: `url(${BgImage})` }}
              className="bg-center py-5"
            >
              <div className="flex justify-center">
                <img src={EmptyImage} className="" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold"> No SBTs Available </h2>
                <p className="my-3">
                  Looks like you don't have SBTs available, then it's time to
                  mint your first SBTs.
                </p>
                <button
                  onClick={() => dispatch(setActivePageIndex(1))}
                  className="rounded-md border mt-5 mb-2 border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                >
                  Mint your SBTs Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <TokensGrid />
        )}
      </div>
    </div>
  );
};
