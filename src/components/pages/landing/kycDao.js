import { KycDaoWidget } from '@kycdao/widget';
import { useState } from 'react';

export function KycDao() {
  const [widgetOpen, setWidgetOpen] = useState(false);

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          KYC DAO Application
        </h2>
        <button
          onClick={() => {
            setWidgetOpen(true);
          }}
          className="inline-flex mt-2 rounded-md border border-transparent bg-purple-500 px-4 py-2 text-base font-medium text-white shadow-sm"
        >
          Apply For KYC DAO SBT
        </button>
        {widgetOpen && (
          <div>
            <div
              style={{
                zIndex: 10,
                width: 400,
                height: 650,
                overflow: 'hidden',
                display: 'block',
                margin: 'auto',
                position: 'relative',
              }}
            >
              <KycDaoWidget
                onSuccess={(tx_url) => console.log(tx_url)}
                onFail={(tx_url) => console.log(tx_url)}
                config={{
                  baseUrl: 'https://staging.kycdao.xyz',
                  enabledVerificationTypes: ['KYC'],
                  enabledBlockchainNetworks: ['NearTestnet'],
                  evmProvider: window.ethereum,
                  sentryConfiguration: {
                    dsn: 'https://23dafecec027439b9413cd50eb22567d@o1184096.ingest.sentry.io/4504559638413313',
                  },
                }}
              />
            </div>
          </div>
        )}
        {/* <button onClick={() => iframeClient.open()}>Open modal</button> */}

        <div id="modalroot" />
      </div>
    </>
  );
}
