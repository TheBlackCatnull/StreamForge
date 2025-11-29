import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { StatefulIcon } from '@/components/StatefulIcon'
import { activeModuleAtom, activeSubRouteAtom, moduleMenus } from '@/store'

export default function SidebarContentLayout({ children }: { children: React.ReactNode }) {
  const [isRouting, setIsRouting] = useState<boolean>(true)
  const activeModuleValue = useAtomValue(activeModuleAtom)
  const activeSubRouteValue = useAtomValue(activeSubRouteAtom)
  const Item = moduleMenus[activeModuleValue][activeSubRouteValue]

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsRouting(!isRouting)
  }, [setIsRouting])
  return (
    <div className={
      clsx('flex-1 shadow-sideMenu rounded-lg bg-gray-50 h-full overflow-auto transition-all duration-500 ease-in-out', isRouting ? 'translate-x-10 opacity-80' : 'translate-x-0 opacity-100')
    }
    >
      <div className="bg-[#2563eb] h-12 app-drag rounded-lg flex items-center px-4">
        <div className="flex items-center gap-1">
          <StatefulIcon
            type={Item.key}
            module="bullet-chat"
            size={Item.size}
            className="mr-2"
          />
          <span className="size-5 font-semibold text-white whitespace-nowrap leading-5">{Item.name}</span>

        </div>

      </div>
      {children}
    </div>
  )
}
