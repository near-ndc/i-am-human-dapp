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

  return (
    <div className="mb-20">
      <h1 className="text-center text-2xl font-semibold mb-20">
        My I-AM-HUMAN Soul Bound Tokens
      </h1>
      <div className="flex flex-col gap-32">
        {!fvTokens && !kycTokens ? (
          <div>
            <h2 className="text-center text-xl"> No SBTs Available </h2>
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap gap-10 ">
            {fvTokens && (
              <div className="bg-gray-100 flex-grow flex flex-1 flex-wrap lg:flex-nowrap gap-10 p-5 rounded-lg">
                <div className="flex items-center">
                  <img src={FVSBTImage} className="object-fill" />
                </div>
                <div>
                  <ValidTokenComponent />
                  <h2 className="font-bold text-3xl my-1">
                    My Face Verification Soul Bound Token
                  </h2>
                  <TokenDetails
                    tokenID={fvTokens.token_id}
                    issuedDate={fvTokens?.metadata?.issued_at}
                    expireDate={fvTokens?.metadata?.expires_at}
                  />
                </div>
              </div>
            )}
            {kycTokens && (
              <div className="bg-gray-100 flex flex-grow flex-1 flex-wrap lg:flex-nowrap gap-10 p-2 px-5 rounded-lg">
                <div className="flex items-center">
                  <img src={KYCSBTImage} className="object-fill" />
                </div>
                <div>
                  <ValidTokenComponent />
                  <h2 className="font-bold text-3xl my-1">
                    My KYC Soul Bound Token
                  </h2>
                  <TokenDetails
                    tokenID={kycTokens?.token_id}
                    issuedDate={kycTokens?.metadata?.issued_at}
                    expireDate={kycTokens?.metadata?.expires_at}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
