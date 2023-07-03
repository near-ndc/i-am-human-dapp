import React, { useEffect, useState } from 'react';
import { MintSVG } from '../../../../images/MintSVG';
import FVSBTImage from '../../../../images/FvSBT.png';
import KYCSBTImage from '../../../../images/KYCSBT.png';
import {
  TokenDetails,
  ValidTokenComponent,
} from '../../../common/TokenDetails';
import ReactConfetti from 'react-confetti';
import { CircleWavyCheck } from '../../../../images/CircleWavyCheck';
import RevokeSBTs from '../../../common/RevokeSBTs';

export const SuccesVerification = () => {
  const [showTooltip, setShowtooltip] = useState(false);
  const fvTokens = JSON.parse(localStorage.getItem('fvTokens'));
  const kycTokens = JSON.parse(localStorage.getItem('kycTokens'));
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
      {showConfetti && (
        <ReactConfetti
          width={document.body.offsetWidth}
          height={document.body.offsetHeight}
        />
      )}
      <div>
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-400">
          <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-green-500 bg-green-200 shadow-green-400 shadow-[inset_0_0px_4px_#FFFFFF]">
            <CircleWavyCheck styles={'w-12 h-12 stroke-black-300 svg-green'} />
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
        </div>
      </div>
      <RevokeSBTs />
    </div>
  );
};
