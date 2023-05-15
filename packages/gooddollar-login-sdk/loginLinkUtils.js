'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createLoginLink = void 0;
const web3sdk_v2_1 = require('@gooddollar/web3sdk-v2');
const createLoginLink = ({ v, web, id, cbu, rdu, r, redirectLink }) => {
  const websiteLink =
    redirectLink ?? 'http://wallet.gooddollar.org/AppNavigation/LoginRedirect';
  const objectToEncode = { v, web, id, cbu, rdu, r };
  if (!cbu && !rdu) {
    throw new Error('Please provide either a cbu or rdu');
  }
  return `${websiteLink}?login=${(0, web3sdk_v2_1.encodeBase64Params)(
    objectToEncode
  )}`;
};
exports.createLoginLink = createLoginLink;
//# sourceMappingURL=loginLinkUtils.js.map
