import React, { useEffect, useState } from 'react';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import {
  TokenDetails,
  ValidTokenComponent,
} from '../../components/common/TokenDetails';
import { wallet } from '../../index';
import { getConfig } from '../../utils/config';
import { toast } from 'react-toastify';
import EmptyImage from '../../images/empty.png';
import BgImage from '../../images/emptySBTBg.png';

export const Home = () => {
  const [fvTokens, setFVTokens] = useState(null);
  const [kycTokens, setKYCTokens] = useState(null);

  useEffect(() => {
    fetchFVTokens();
    fetchKYCTokens();
  }, []);

  const fetchFVTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: getConfig().og_contract,
        method: 'nft_tokens_for_owner',
        args: { account: wallet.accountId },
      });
      setFVTokens(data?.[0]);
    } catch {
      toast.error(
        'An error occured while fetching face verification SBT details'
      );
    }
  };

  const fetchKYCTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: getConfig().fractal_contract,
        method: 'nft_tokens_for_owner',
        args: { account: wallet.accountId },
      });
      setKYCTokens(data);
    } catch {
      toast.error('An error occured while fetching KYC SBT details');
    }
  };

  const Item = ({ imageSrc, children }) => {
    return (
      <div className="bg-gray-100 flex flex-grow flex-1 flex-wrap lg:flex-nowrap gap-10 p-5 rounded-lg">
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
        {!fvTokens && !kycTokens ? (
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
                  mint your first SBTs now
                </p>
                <button className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
                  Mint your SBTs Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap gap-5">
            {fvTokens && (
              <Item imageSrc={FVSBTImage}>
                <ValidTokenComponent />
                <h2 className="font-bold text-3xl my-1">
                  My Face Verification Soul Bound Token
                </h2>
                <TokenDetails
                  tokenID={fvTokens.token_id}
                  issuedDate={fvTokens?.metadata?.issued_at}
                  expireDate={fvTokens?.metadata?.expires_at}
                />
              </Item>
            )}
            {kycTokens && (
              <Item imageSrc={KYCSBTImage}>
                <ValidTokenComponent />
                <h2 className="font-bold text-3xl my-1">
                  My KYC Soul Bound Token
                </h2>
                <TokenDetails
                  tokenID={kycTokens?.token_id}
                  issuedDate={kycTokens?.metadata?.issued_at}
                  expireDate={kycTokens?.metadata?.expires_at}
                />
              </Item>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
