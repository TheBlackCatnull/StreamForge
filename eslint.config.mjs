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
    // "react-hooks/exhaustive-deps": "error", // "error" 级别会报错，"warn" 仅警告，按需选择
    // // 可选：React 官方还推荐启用这两个规则（检查 Hook 调用规范）
    // "react-hooks/rules-of-hooks": "error" // 禁止在条件/循环中调用 Hook（必须在顶层）
  },
})
