'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useLogin = void 0;
const react_1 = require('react');
const web3sdk_v2_1 = require('@gooddollar/web3sdk-v2');
const useLogin = (props) => {
  const { onLoginCallback, ...rest } = props;
  const onClick = () => {
    if (rest?.rdu && typeof rest?.rdu === 'string') {
      window.location.href = rest?.gooddollarlink;
      return;
    } else if (!rest?.cbu) {
      throw new Error(
        'Please provide either a callback url or redirect URL to the component'
      );
    }
    const openedWindow = window.open(
      rest?.gooddollarlink,
      '_blank',
      'width=400,height=500,left=100,top=200'
    );
    const loop = setInterval(() => {
      if (openedWindow?.closed) {
        clearInterval(loop);
        onLoginCallback();
      }
    }, 250);
  };
  (0, react_1.useEffect)(() => {
    if (window.location.href.includes('?login=')) {
      const loginURI = window.location.href.split('=');
      onLoginCallback((0, web3sdk_v2_1.decodeBase64Params)(loginURI[1]));
    }
  }, []);
  return onClick;
};
exports.useLogin = useLogin;
//# sourceMappingURL=loginHook.js.map
