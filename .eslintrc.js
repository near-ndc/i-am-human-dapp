const unusedVarsCfg = [
  'warn',
  {
    vars: 'all',
    args: 'none',
    ignoreRestSiblings: false,
    varsIgnorePattern: '_',
  },
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'no-unused-vars': unusedVarsCfg,
    'react/jsx-key': 'off',
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
