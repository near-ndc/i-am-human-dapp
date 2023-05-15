'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseLoginResponse = void 0;
const web3_1 = __importDefault(require('web3'));
const deployment_json_1 = __importDefault(
  require('@gooddollar/goodprotocol/releases/deployment.json')
);
const IIdentity_json_1 = __importDefault(
  require('@gooddollar/goodprotocol/artifacts/contracts/Interfaces.sol/IIdentity.json')
);
const process_1 = require('process');
const transformObject = (res) => ({
  walletAddress: { value: res.a.value, isVerified: false },
  isAddressWhitelisted: { value: res.v.value, isVerified: false },
  ...(res?.I?.value
    ? { location: { value: res.I.value, isVerified: false } }
    : {}),
  ...(res?.av?.value
    ? { avatar: { value: res.av.value, isVerified: false } }
    : {}),
  ...(res?.n?.value
    ? { fullName: { value: res.n.value, isVerified: false } }
    : {}),
  ...(res?.m?.value
    ? { mobile: { value: res.m.value, isVerified: false } }
    : {}),
  ...(res?.e?.value
    ? { email: { value: res.e.value, isVerified: false } }
    : {}),
});
const parseLoginResponse = async (response, contractsEnv = 'production') => {
  if (response?.error) {
    return;
  }
  const { sig, a, nonce, v } = response;
  const nonceNotToOld = Date.now() - nonce.value <= 600000;
  if (nonceNotToOld) {
    const web3Instance = new web3_1.default(
      new web3_1.default.providers.HttpProvider('https://rpc.fuse.io/')
    );
    const dataToRecover = { ...response };
    delete dataToRecover.sig;
    const userRecoveredWalletAddress = web3Instance.eth.accounts.recover(
      JSON.stringify(dataToRecover),
      sig
    );
    if (userRecoveredWalletAddress === a.value) {
      const identityContract = new web3Instance.eth.Contract(
        IIdentity_json_1.default.abi,
        deployment_json_1.default[
          process_1.env?.REACT_APP_NETWORK ?? contractsEnv
        ].Identity,
        { from: a.value }
      );
      try {
        const isAddressWhitelisted =
          v.value &&
          (await identityContract.methods.isWhitelisted(a.value).call());
        return {
          ...transformObject(response),
          isAddressWhitelisted: {
            value: isAddressWhitelisted,
            isVerified: true,
          },
          verifiedResponse: true,
        };
      } catch (e) {
        console.error(e);
        return {
          ...transformObject(response),
          verifiedResponse: false,
          error: e.message,
        };
      }
    } else {
      console.warn('address mismatch', {
        userRecoveredWalletAddress,
        address: a.value,
      });
      return {
        ...transformObject(response),
        verifiedResponse: false,
        error: 'address mismatch',
      };
    }
  } else {
    console.warn('nonce too old');
    return {
      ...transformObject(response),
      verifiedResponse: false,
      error: 'invalid nonce',
    };
  }
};
exports.parseLoginResponse = parseLoginResponse;
//# sourceMappingURL=parseLoginResponse.js.map
