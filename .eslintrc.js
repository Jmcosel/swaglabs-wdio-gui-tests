module.exports = {
  plugins: ['prettier', 'wdio'],
  env: {
    browser: true,
    es2018: true,
    node: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:wdio:recommended'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error']
  }
};
