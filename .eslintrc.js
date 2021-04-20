module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always', {
      mjs: 'always',
    }],
  },
};
