// @ts-check

import globals from 'globals';
import tseslint from 'typescript-eslint'; // Ainda precisamos disto para os configs
import pluginPlaywright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...tseslint.configs.recommended,
  pluginPlaywright.configs['flat/recommended'],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'playwright/expect-expect': 'off',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'playwright-report/',
      'test-results/',
      'auth.json',
      '.vscode/',
      '**/*.md',
    ],
  },
  eslintConfigPrettier,
];
