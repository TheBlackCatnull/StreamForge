import { useAtomValue } from 'jotai'
import SidebarMenuLayout from '@/components/Layout/SidebarMenuLayout'
import { activeModuleAtom, moduleMenus } from '@/store'

export default function CasualGames() {
  const activeModuleValue = useAtomValue(activeModuleAtom)
  return <SidebarMenuLayout menuItems={moduleMenus[activeModuleValue]} module="bullet-chat" />
}
