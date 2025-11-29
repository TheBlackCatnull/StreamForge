import type { SidebarMenuItem } from '@/components/Layout/SidebarMenuLayout'
import { useAtomValue } from 'jotai'
import SidebarMenuLayout from '@/components/Layout/SidebarMenuLayout'
import { activeModuleAtom, moduleMenus } from '@/store'
// 定义当前模块的菜单（差异化配置）
// const menuItems: SidebarMenuItem[] = [
//   { key: 'link', name: '开心扫雷', path: '/CasualGames/mine', size: { width: 18, height: 19 } },
// ]

export default function BulletChatMain() {
  const activeModuleValue = useAtomValue(activeModuleAtom)
  return <SidebarMenuLayout menuItems={moduleMenus[activeModuleValue]} module={activeModuleValue} />
}
