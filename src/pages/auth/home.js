import React, { useEffect, useState } from 'react';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import OGSBT from '../../images/OGSBT.png';
import {
  TokenDetails,
  ValidTokenComponent,
} from '../../components/common/TokenDetails';
import { wallet } from '../../index';
import { getConfig } from '../../utils/config';
import { toast } from 'react-toastify';
import EmptyImage from '../../images/empty.png';
import BgImage from '../../images/emptySBTBg.png';
import { isNumber } from '../../utils/utilityFunctions';
import { LSKeys } from '../../utils/constants';

export const Home = ({
  setActiveTabIndex,
  sendFVTokensDetails,
  sendKYCTokensDetails,
  sendOGTokenDetails,
}) => {
  const [fvTokens, setFVTokens] = useState(null);
  const [kycTokens, setKYCTokens] = useState(null);
  const [ogTokens, setOGTokens] = useState(null);

  useEffect(() => {
    // fetching only when logged in (without steps) state active
    if (!isNumber(setActiveTabIndex)) {
      // fetchOGSBTTokens(); // TO BE UNCOMMENTED WHEN MAINNET CONTRACT IS DEPLOYED
      fetchTokens();
    }
  }, [setActiveTabIndex]);

  const fetchOGSBTTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: getConfig().app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: getConfig().og_contract, // issuer is community sbt contract
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => OG token
          if (token.metadata.class === 1) {
            sendOGTokenDetails(token);
            setOGTokens(token);
            localStorage.setItem('ogTokens', JSON.stringify(token));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching OG Token details');
    }
  };

  const fetchTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: getConfig().app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: getConfig().fractal_contract, // issuer is fractal
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => FV token
          if (token.metadata.class === 1) {
            setFVTokens(token);
            sendFVTokensDetails(token);
            localStorage.setItem('fvTokens', JSON.stringify(token));
            // TODO UPDATE CLASS WHEN CONTRACT IS READY FOR OG
          } else if (token.metadata.class === 2) {
            sendOGTokenDetails(token);
            setOGTokens(token);
            localStorage.setItem('ogTokens', JSON.stringify(token));
          } else {
            sendKYCTokensDetails(token);
            setKYCTokens(token);
            localStorage.setItem('kycTokens', JSON.stringify(token));
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

  const Item = ({ imageSrc, children }) => {
    return (
      <div className="bg-gray-100 flex flex-grow flex-1 flex-wrap lg:flex-nowrap gap-10 p-5 rounded-lg items-center">
        <div className="flex items-start justify-center">
          <img
            src={imageSrc}
            className="object-cover rounded-lg max-h-[350px]"
          />
        </div>
        <div>{children}</div>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <h1 className="text-center text-2xl font-semibold mb-10">
        My I-AM-HUMAN Soul Bound Tokens
      </h1>
      <div className="flex flex-col gap-32">
        {!fvTokens && !kycTokens && !ogTokens ? (
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
                  onClick={() => setActiveTabIndex(1)}
                  className="rounded-md border mt-5 mb-2 border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                >
                  Mint your SBTs Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-10 flex-wrap gap-5">
            {fvTokens && (
              <Item imageSrc={FVSBTImage}>
                <ValidTokenComponent />
                <h2 className="font-bold text-3xl my-1 mb-5">
                  My Face Verification Soul Bound Token
                </h2>
                <TokenDetails
                  tokenID={fvTokens.token}
                  issuedDate={fvTokens?.metadata?.issued_at}
                  expireDate={fvTokens?.metadata?.expires_at}
                />
              </Item>
            )}
            {kycTokens && (
              <Item imageSrc={KYCSBTImage}>
                <ValidTokenComponent />
                <h2 className="font-bold text-3xl my-1 mb-5">
                  My KYC Soul Bound Token
                </h2>
                <TokenDetails
                  tokenID={kycTokens?.token}
                  issuedDate={kycTokens?.metadata?.issued_at}
                  expireDate={kycTokens?.metadata?.expires_at}
                />
              </Item>
            )}
            {ogTokens && (
              <Item imageSrc={OGSBT}>
                <ValidTokenComponent />
                <h2 className="font-bold text-3xl my-1 mb-5">
                  My OG Soul Bound Token
                </h2>
                <TokenDetails
                  tokenID={ogTokens?.token}
                  issuedDate={ogTokens?.metadata?.issued_at}
                  expireDate={ogTokens?.metadata?.expires_at}
                />
              </Item>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
