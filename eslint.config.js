import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'// eslint.config.js
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic, // 注册风格插件
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 缩进：2 个空格，警告
      '@stylistic/indent': ['error', 2],
      // 字符串使用单引号，自动修复
      '@stylistic/jsx-indent': ['error', 2],
      // JSX 属性缩进（与标签名保持 2 空格对齐）
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      // 语句结尾必须有分号，自动修复
      //'@stylistic/semi': ['error', 'always'],
      // 禁止未使用的变量，警告（忽略下划线开头的变量）
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 禁止 console（开发环境允许）
      'no-console': 'off',
      // React Refresh 规则：允许未使用的变量（热更新需要）
      'react-refresh/only-export-components': 'warn',
      '@stylistic/jsx-indent': ['error', 2],// 缩进 2 个空格（推荐）
      '@stylistic/jsx-indent-props': ['error', 2], // JSX 属性缩进 2 个空格（推荐）
      // 箭头函数参数：单个参数可省略括号，多个参数必须加括号
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      // 箭头前后必须有空格（() => {} 而非 ()=>{} 或 () =>{}）
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      //'@stylistic/function-paren-newline': ['error', 'multiline'],
      // 函数名与括号间无空格（function fn() {} 而非 function fn () {}）
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'never', // 匿名函数（() => {}）无空格
        named: 'never', // 命名函数（fn() => {}）无空格
        asyncArrow: 'always' // 异步箭头函数（async () => {}）有空格
      }],
      // 对象：多行时强制换行，单行可紧凑
      '@stylistic/object-curly-newline': ['error', {
        multiline: true, // 多行对象必须换行
        minProperties: 3 // 超过 3 个属性强制换行
      }],
      // 数组：多行时强制换行，单行可紧凑
      '@stylistic/array-bracket-newline': ['error', {
        multiline: true,
        minItems: 3
      }],
      // 对象括号内有空格（{ key: 1 } 而非 {key:1}）
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/space-infix-ops': ['error'],
      // 逗号后必须有空格（a, b 而非 a,b）
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      'no-trailing-spaces': 'error',

      // 函数调用时括号内的空格
      'space-in-parens': ['error', 'never'],

      // 函数名和调用括号之间的空格
      'func-call-spacing': ['error', 'never'],

      // 关键字前后的空格
      'keyword-spacing': ['error', {
        before: true,
        after: true
      }], // 数组括号内的空格
      'array-bracket-spacing': ['error', 'never'],

      // 逗号前不能有空格，逗号后必须有空格
      'comma-spacing': ['error', { before: false, after: true }],

      // 同时还需要这个通用规则来检测多个空格
      'no-multi-spaces': 'error',
    },
  },

])//
