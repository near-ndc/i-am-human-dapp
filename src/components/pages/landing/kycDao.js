import { KycDaoWidget } from '@kycdao/widget';
import { useState } from 'react';

export function KycDao() {
  const [widgetOpen, setWidgetOpen] = useState(false);

  return (
    <>
      <div>
        <h1>React component integration</h1>
        <button
          onClick={() => {
            setWidgetOpen(true);
          }}
        >
          Open Modal
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
                  enabledBlockchainNetworks: ['PolygonMumbai'],
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
