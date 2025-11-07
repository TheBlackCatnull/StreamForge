import { createBrowserRouter } from 'react-router-dom'

import ComponentSetting from '@/pages/BulletChatMain/ComponentSetting'
import DisplaySetting from '@/pages/BulletChatMain/DisplaySetting'
import HistorySetting from '@/pages/BulletChatMain/HistorySetting'
import LinkSetting from '@/pages/BulletChatMain/LinkSetting'
import RenderSetting from '@/pages/BulletChatMain/RenderSetting'
import BulletChatMain from './pages/BulletChatMain' // 弹幕主模块页面
import HomePage from './pages/Home' // 包含卡片网格的首页

// 定义路由映射关系（卡片标识 → 对应路由）
export const routeMap: Record<string, string> = {
  弹幕主模块: '/BulletChatMain',
  首页: '/',

}

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, // 首页包含卡片网格
  },
  {
    path: '/BulletChatMain',
    element: <BulletChatMain />,
    children: [
      { path: 'link', element: <LinkSetting /> }, // 链接设置子页面
      { path: 'components', element: <ComponentSetting /> }, // 组件设置子页面
      { path: 'display', element: <DisplaySetting /> },
      { path: 'render', element: <RenderSetting /> },
      { path: 'history', element: <HistorySetting /> },
    ],
  },

])

export default router
