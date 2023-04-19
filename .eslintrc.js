module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/semi': ['error', 'always']
  }
};
