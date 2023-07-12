module.exports = {
  "root": true,
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
  },
  "plugins": [
    "@typescript-eslint"
  ],
  extends: [
    'react-app',
    'react-app/jest',
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/strict",
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  // },
  // plugins: ['react', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'off',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'no-alert': 'off',
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       paths: ['src'],
  //     },
  //   },
  // },
};
