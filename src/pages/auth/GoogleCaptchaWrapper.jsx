import React, { useEffect, useState } from 'react';
import {
  ConnectWallet,
  MintSBT,
  ScanFace,
} from '../../components/fractalVerification/TabScreens';
import FvVerificationTabs from '../../components/fractalVerification/FvVerificationTabs';
import { WalletSVG } from '../../images/WalletSVG';
import { FaceSVG } from '../../images/FaceSVG';
import { MintSVG } from '../../images/MintSVG';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReducerNames } from '../../utils/constants';
import { useSelector } from 'react-redux';

const GoogleCaptchaWrapper = () => {
  const { activePageIndex } = useSelector(
    (state) => state[ReducerNames.COMMON]
  );
  const [error, setError] = useState(false);
  const activeTab = (index) =>
    activePageIndex >= index
      ? 'stroke-themeColor svg-themeColor'
      : 'stroke-gray-300 svg-gray';

  const TabsData = [
    {
      name: 'Connect Wallet',
      header: <WalletSVG styles={`w-12 h-12 ${activeTab(0)}`} />,
      content: <ConnectWallet />,
    },
    {
      name: 'Face Scan',
      header: <FaceSVG styles={`w-12 h-12 ${activeTab(1)}`} />,
      content: <ScanFace setError={setError} isError={error} />,
    },
    {
      name: 'Mint SBT',
      header: <MintSVG styles={`w-12 h-12 ${activeTab(2)}`} />,
      content: <MintSBT setError={setError} isError={error} />,
    },
  ];

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RE_CAPTCHA_KEY}
      language="en"
    >
      <div className="lg:mx-auto lg:max-w-7xl">
        {typeof activePageIndex === 'number' && (
          <FvVerificationTabs tabs={TabsData} error={error} />
        )}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default GoogleCaptchaWrapper;
