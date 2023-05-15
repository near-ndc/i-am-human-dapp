'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginButton = void 0;
const react_1 = __importDefault(require('react'));
const loginHook_1 = require('./loginHook');
const LoginButton = (props) => {
  const { onLoginCallback, ...rest } = props;
  const onButtonClick = (0, loginHook_1.useLogin)({
    rdu: rest.rdu,
    cbu: rest.cbu,
    gooddollarlink: rest.gooddollarlink,
    onLoginCallback: onLoginCallback,
  });
  return react_1.default.createElement('button', {
    ...rest,
    onClick: onButtonClick,
  });
};
exports.LoginButton = LoginButton;
//# sourceMappingURL=loginButton.js.map
