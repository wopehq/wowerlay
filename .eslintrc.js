/** @type { import('eslint').Linter.Config } */
const config = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-typescript-prettier',
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    // Project rules
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-unresolved': 'off',

    // React JSX rules that we don't care about while using vue.
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/no-unknown-property': 'off',
    'react/no-string-refs': 'off',
  },
  overrides: [
    {
      files: '*.d.ts',
      rules: {
        'no-var': 'off',
      },
    },
  ],
};

module.exports = config;
