import type { ModuleType } from '@/assets/icons'
// src/components/Layout/SidebarMenuLayout.tsx
import { clsx } from 'clsx'
import { useAtom, useSetAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Return from '@/assets/Return.png' // 建议将图片放到统一的assets目录
import { StatefulIcon } from '@/components/StatefulIcon'
import { activeSubRouteAtom } from '@/store'
import { cn } from '@/utils/ui'
// 动画状态类型（复用原定义）
export type MenuItemAnimationType
  = | 'pending'
    | 'entering'
    | 'idle'
    | 'click-shift-left'
    | 'click-expand'

// 菜单项目接口（复用原定义）
export interface SidebarMenuItem {
  key: string
  name: string
  path: string
  size: { width: number, height: number }
}

// 布局组件的Props：传入差异化配置
interface SidebarMenuLayoutProps {
  menuItems: SidebarMenuItem[] // 当前模块的菜单列表
  module: ModuleType // 模块标识（如 'bullet-chat'/'casual-games'，用于StatefulIcon）
  sidebarTitle?: string // 侧边栏标题（可选）
}

export default function SidebarMenuLayout({
  menuItems,
  module,
  sidebarTitle = '返回',
}: SidebarMenuLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [ActiveSubRouteValue, setActiveSubRoute] = useAtom(activeSubRouteAtom)
  // 动画状态（复用原逻辑）
  const [menuItemAnimationStates, setMenuItemAnimationStates] = useState<MenuItemAnimationType[]>(
    menuItems.map(() => 'pending'),
  )

  // 点击菜单逻辑（复用原逻辑）
  const handleMenuItemClick = useCallback(
    (item: SidebarMenuItem, index: number) => {
      const newStates: MenuItemAnimationType[] = menuItemAnimationStates.map(() => 'idle')
      newStates[index] = 'click-shift-left'
      setMenuItemAnimationStates([...newStates])

      navigate(item.path)
      setActiveSubRoute(index)
    },
    [menuItemAnimationStates, navigate, setActiveSubRoute],
  )

  // 动画结束逻辑（复用原逻辑）
  const handleAnimationEnd = useCallback(
    (itemIndex: number, e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget)
        return
      if (menuItemAnimationStates[itemIndex] === 'click-shift-left') {
        const newStates = menuItemAnimationStates.map((state, i) =>
          i === itemIndex ? 'click-expand' : state,
        )
        setMenuItemAnimationStates(newStates)
      }
    },
    [menuItemAnimationStates],
  )

  // 入场动画逻辑（复用原逻辑）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuItemAnimationStates(menuItems.map((_, index) => index === 0 ? 'click-expand' : 'entering'))
    navigate(menuItems[ActiveSubRouteValue].path)
  }, [menuItems])

  // 动画样式（复用原定义）
  const menuItemAnimationStyles = {
    'pending': '-translate-x-full duration-300',
    'entering': 'translate-x-0 duration-300 w-[100%]',
    'idle': 'translate-x-0 duration-300 w-[100%]',
    'click-shift-left': '-translate-x-[10%] duration-300',
    'click-expand': 'w-[110%] duration-200',
  }

  return (
    <main className={cn('w-full h-full flex gap-4 rounded-lg shadow-custom overflow-hidden bg-mywhite')}>
      {/* 侧边栏 */}
      <div
        className={clsx('w-56 rounded-lg bg-white shadow-sideMenu z-20 transition-all duration-500 ease-out')}
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col h-full gap-[3px]">
          {/* 返回按钮 */}
          <div
            className="h-[75px] items-center flex justify-center box-border bg-blue-600 rounded-xl border-[3px] border-white duration-300 shadow-menuItem hover:scale-[102%] hover:shadow-cardEnter active:scale-95 active:shadow-cardClick"
            onClick={() => {
              setActiveSubRoute(0)
              navigate('/')
            }}
          >
            <div>
              <img src={Return} className="object-contain ml-2 w-[20px] h-[25px]" />
              <div className={clsx('text-xl font-bold font-["Source_Han_Sans_CN"] text-white')}>
                {sidebarTitle}
              </div>
            </div>
          </div>

          {/* 菜单列表（根据传入的menuItems渲染） */}
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            const currentState = menuItemAnimationStates[index]
            const isInteractive
              = currentState === 'click-shift-left' || currentState === 'click-expand' || isActive

            return (
              <div
                key={item.key}
                className={clsx(
                  'h-[75px] box-border bg-white rounded-xl border-[3px] border-white shadow-menuItem',
                  isInteractive ? 'z-30 shadow-lg' : 'shadow-md',
                  menuItemAnimationStyles[currentState],
                )}
                style={{
                  transitionDelay: ['entering'].includes(currentState) ? `${index * 100}ms` : '0ms',
                }}
                onMouseDown={['entering', 'idle'].includes(currentState) ? () => handleMenuItemClick(item, index) : () => null}
                onTransitionEnd={
                  menuItemAnimationStates[index] === 'click-shift-left'
                    ? e => handleAnimationEnd(index, e)
                    : () => null
                }
              >
                <div className="w-full items-center flex h-full justify-center">
                  <StatefulIcon
                    type={item.key}
                    module={module}
                    size={item.size}
                    className="mr-2"
                    active={isActive}
                  />
                  <div className={clsx(
                    'text-xl font-bold font-["Source_Han_Sans_CN"]',
                    isActive ? 'text-blue-600' : 'text-[#606060]',
                  )}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 路由出口 */}

      <Outlet />

    </main>
  )
}
