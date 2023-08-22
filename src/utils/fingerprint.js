import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

// Initilize the agent with load()
const fpPromise = FingerprintJS.load({
  apiKey: process.env.REACT_APP_FINGERPRINT_KEY,
});

export { fpPromise };
