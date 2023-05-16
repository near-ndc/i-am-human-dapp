import React, { useState } from 'react';
import Level0 from '../../../images/fingerprints/level0.png';
import Level1Fv from '../../../images/fingerprints/level1-fv.png';
import Level1Og from '../../../images/fingerprints/level1-og.png';
import Level1KYC from '../../../images/fingerprints/level1-kyc.png';
import Level2FvOg from '../../../images/fingerprints/level2-fv-og.png';
import Level2FvKyc from '../../../images/fingerprints/level2-fv-kyc.png';
import Level2KycOg from '../../../images/fingerprints/level2-kyc-og.png';
import Level3 from '../../../images/fingerprints/level3.png';
import { IAmHumanStatusVideo } from './iAmHumanStatusVideo';

export const IAmHumanStatus = ({ isSbtToken, isFvToken, isKycDao = false }) => {
  const switchImage = () => {
    switch (true) {
      case isSbtToken && isFvToken && isKycDao:
        return Level3;
      case !isSbtToken && !isFvToken && !isKycDao:
        return Level0;
      case isSbtToken && !isFvToken && !isKycDao:
        return Level1Og;
      case !isSbtToken && isFvToken && !isKycDao:
        return Level1Fv;
      case !isSbtToken && !isFvToken && isKycDao:
        return Level1KYC;
      case isSbtToken && isFvToken && !isKycDao:
        return Level2FvOg;
      case isSbtToken && !isFvToken && isKycDao:
        return Level2KycOg;
      case !isSbtToken && isFvToken && isKycDao:
        return Level2FvKyc;
      default:
        console.log('Unhandled case.');
    }
  };

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div className="py-3">
      <p className="text-3xl font-bold mb-2">Result : Your Human Status</p>
      <p className="text-lg text-gray-500">
        This Image changes based on the level of personhood you have achieved
        inside our app
      </p>
      <div className="mx-auto" style={{ width: 400, height: 400 }}>
        <img src={switchImage()} alt="humanLevel" />
      </div>
      <button
        onClick={() => setIsVideoOpen(true)}
        className="inline-flex rounded-md border px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-100"
      >
        Click here to see how it works
      </button>
      <IAmHumanStatusVideo open={isVideoOpen} setOpen={setIsVideoOpen} />
    </div>
  );
};
