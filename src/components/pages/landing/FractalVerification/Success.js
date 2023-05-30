import React from 'react';
import { MintSVG } from '../../../../images/MintSVG';
import FVSBTImage from '../../../../images/FvSBT.png';
import KYCSBTImage from '../../../../images/KYCSBT.png';
import {
  TokenDetails,
  ValidTokenComponent,
} from '../../../common/TokenDetails';

export const SuccesVerification = () => {
  const fvTokens = localStorage.getItem('fvTokens');
  const kycTokens = localStorage.getItem('kycTokens');

  const Item = ({ imageSrc, children }) => {
    return (
      <div className="bg-gray-100 flex flex-grow flex-1 flex-wrap lg:flex-nowrap gap-10 p-5 mb-6 rounded-lg">
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
    <div className="w-full">
      <div>
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-400">
          <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-green-500 bg-green-200 shadow-green-400 shadow-[inset_0_0px_4px_#FFFFFF]">
            <MintSVG styles={'w-12 h-12 stroke-green-300'} />
          </div>
        </div>
        <h2 className="text-4xl font-bold	my-4">Success!</h2>
        <p className="text-s mb-8 mr-8">
          Check out your newly minted Soul Bound Tokens! You can now participate
          in Near Digital Collective (NDC) governance. Share the good news!
        </p>

        <div className="flex flex-wrap md:flex-nowrap gap-5">
          {fvTokens && (
            <Item imageSrc={FVSBTImage}>
              <ValidTokenComponent />
              <h2 className="font-bold text-3xl my-1">
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
              <h2 className="font-bold text-3xl my-1">
                My KYC Soul Bound Token
              </h2>
              <TokenDetails
                tokenID={kycTokens?.token}
                issuedDate={kycTokens?.metadata?.issued_at}
                expireDate={kycTokens?.metadata?.expires_at}
              />
            </Item>
          )}
        </div>

        <div className="flex items-center">
          <a
            target="_blank"
            rel="noreferrer"
            class="twitter-share-button"
            href="https://twitter.com/intent/tweet?text=Participate in Governance and mint your SBTs for proof of humanity at https://i-am-human.app/. Mines are minted in my wallet.

            #NEAR #NDC #CommunityGovernance #WeAreCommunity"
            data-size="large"
            className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
          >
            <p className="mx-auto w-[fit-content]">Share on Twitter</p>
          </a>
        </div>
      </div>

      <p className="text-s mt-8">
        Please note that you can request for your SBTs to be revoked (along with
        deletion of any identifying data stored by I-AM-HUMAN and Fractal).
      </p>
    </div>
  );
};
