import type { ModuleType } from '@/assets/icons'
import { atom } from 'jotai'

export interface SidebarMenuItem {
  key: string
  name: string
  path: string
  size: { width: number, height: number }
}
export const moduleMenus: Record<string, SidebarMenuItem[]> = {
  // 弹幕模块菜单
  'bullet-chat': [
    { key: 'link', name: '链接设置', path: '/BulletChatMain/link', size: { width: 18, height: 19 } },
    { key: 'component', name: '组件设置', path: '/BulletChatMain/components', size: { width: 23, height: 18 } },
    { key: 'display', name: '显示设置', path: '/BulletChatMain/display', size: { width: 16, height: 15 } },
    { key: 'render', name: '渲染设置', path: '/BulletChatMain/render', size: { width: 13, height: 18 } },
    { key: 'history', name: '历史弹幕', path: '/BulletChatMain/history', size: { width: 15, height: 15 } },
  ],

  // 休闲游戏模块菜单
  'casual-games': [
    { key: 'link', name: '开心扫雷', path: '/CasualGames/mine', size: { width: 18, height: 19 } },
  ],
}
export const HomeAnimationAtom = atom(false)
export const activeModuleAtom = atom<ModuleType>('bullet-chat')
export const activeSubRouteAtom = atom(0)
