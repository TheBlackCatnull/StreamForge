import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  stylistic: {
    indent: 2, // 2空格缩进
    quotes: 'single', // 单引号
  },
  typescript: true,

  // 启用 TypeScript 支持（如果项目用了 TS）
  // 启用 React 支持（如果是 React 项目）
  react: true,
  // 忽略不需要检查的文件/目录
  node: true,
  ignores: [
    'dist',
    'node_modules',
    '*.config.js', // 忽略配置文件
  ],
  rules: {
    'node/prefer-global/process': 'off', // 禁用此规则
  },
})
