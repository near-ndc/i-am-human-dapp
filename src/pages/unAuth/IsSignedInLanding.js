import React, { useEffect, useState } from 'react';
import {
  ConnectWallet,
  MintSBT,
  ScanFace,
} from '../../components/pages/landing/FractalVerification';
import { Tabs } from '../../components/common/Tabs';
import { WalletSVG } from '../../images/WalletSVG';
import { FaceSVG } from '../../images/FaceSVG';
import { MintSVG } from '../../images/MintSVG';

export const IsSignedInLanding = ({ activeTabIndex, setActiveTabIndex }) => {
  const [error, setError] = useState(false);
  const [successSBT, setSuccessSBT] = useState(false);
  const activeTab = (index) =>
    activeTabIndex >= index ? 'stroke-purple-400' : 'stroke-gray-300';

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
      content: (
        <MintSBT
          setActiveTabIndex={setActiveTabIndex}
          successSBT={successSBT}
          setSuccessSBT={setSuccessSBT}
          setError={setError}
          isError={error}
        />
      ),
    },
  ];

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  return (
    <div className="lg:mx-auto lg:max-w-7xl">
      {typeof activeTabIndex === 'number' && (
        <Tabs
          tabs={TabsData}
          activeTabIndex={activeTabIndex}
          error={error}
          successSBT={successSBT}
          setActiveTabIndex={() => null}
        />
      )}
    </div>
  );
};
