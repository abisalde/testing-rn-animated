import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import testingLibrary from 'eslint-plugin-testing-library';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';
import reactHooks from 'eslint-plugin-react-hooks';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: [js.configs.recommended, reactNative.configs.recommended],
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
            '.native.js',
            '.native.jsx',
            '.native.ts',
            '.native.tsx',
            '.android.js',
            '.android.jsx',
            '.android.ts',
            '.android.tsx',
            '.ios.js',
            '.ios.jsx',
            '.ios.ts',
            '.ios.tsx',
          ],
        },

        typescript: {
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
    extends: compat.extends(),
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react: pluginReact,
      'react-native': reactNative,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
      'sort-keys-custom-order': sortKeysCustomOrder,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-keys-custom-order/object-keys': ['error', {}],
      'react-native/sort-styles': ['error', 'asc'],
      'sort-keys': 0,
      curly: ['error', 'multi-line'],
      'import/no-cycle': 0,

      indent: 'off',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ignoreComments: false,
        },
      ],
    },
  },
  {
    files: [
      '**/*.{ts,mts,cts,tsx}',
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        jsx: true,
        useJSXTextNode: true,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-native': reactNative,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-keys-custom-order': sortKeysCustomOrder,
      'testing-library': testingLibrary,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-keys-custom-order/type-keys': ['error', {}],
      'sort-keys-custom-order/object-keys': ['error', {}],
      'react-native/sort-styles': ['error', 'asc'],
      'sort-keys': 0,
      curly: ['error', 'multi-line'],
      'import/no-cycle': 0,
      'no-console': 'error',
      indent: 'off',
      'prefer-const': [
        'error',
        { destructuring: 'all', ignoreReadBeforeAssign: true },
      ],

      // Stylistic rules
      '@stylistic/max-len': ['error', { code: 160 }],
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ignoreComments: false,
        },
      ],

      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-sort-props': [
        'error',
        { multiline: 'first', callbacksLast: true, shorthandFirst: true },
      ],
      '@stylistic/jsx-self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/member-delimiter-style': ['error', {}],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Compiler rules
      'react-hooks/config': 'error',
      'react-hooks/error-boundaries': 'error',
      'react-hooks/component-hook-factories': 'error',
      'react-hooks/gating': 'error',
      'react-hooks/globals': 'error',
      'react-hooks/immutability': 'error',
      'react-hooks/preserve-manual-memoization': 'error',
      'react-hooks/purity': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/set-state-in-render': 'error',
      'react-hooks/static-components': 'error',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/use-memo': 'error',
      'react-hooks/incompatible-library': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/indent': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    ignores: [
      'node_modules/**',
      'android/**',
      'ios/**',
      '**/build/**',
      '**/dist/**',
      '**/*.min.js',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '__mocks__',
    ],
  },
]);
