import { clsx } from 'clsx'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { StatefulIcon } from '@/components/StatefulIcon'
import { HomeAnimationAtom } from '@/store'
import { cn } from '@/utils/ui'
import Return from './Return.png'

type MenuItemAnimationType
  = | 'pending' // 等待入场（初始状态）
    | 'entering' // 正在入场（从左侧滑入）
    | 'idle' // 入场完成（静止状态）
    | 'click-shift-left' // 点击后左移
    | 'click-expand' // 左移后展开
const menuItemAnimationStyles = {
  'pending': '-translate-x-full duration-300',
  'entering': 'translate-x-0 duration-300 w-[100%]',
  'idle': 'translate-x-0 duration-300 w-[100%]',
  'click-shift-left': '-translate-x-[10%] duration-300',
  'click-expand': 'w-[110%] duration-200',
}
interface menuItem {
  key: string
  name: string
  path: string
  size: {
    width: number
    height: number
  }
}
export default function BulletChatMain() {
  // const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const menuItems: menuItem[] = [
    { key: 'link', name: '链接设置', path: '/BulletChatMain/link', size: { width: 18, height: 19 } },
    { key: 'component', name: '组件设置', path: '/BulletChatMain/components', size: { width: 23, height: 18 } },
    { key: 'display', name: '显示设置', path: '/BulletChatMain/display', size: { width: 16, height: 15 } },
    { key: 'render', name: '渲染设置', path: '/BulletChatMain/render', size: { width: 13, height: 18 } },
    { key: 'history', name: '历史弹幕', path: '/BulletChatMain/history', size: { width: 15, height: 15 } },

  ]
  const [menuItemAnimationStates, setMenuItemAnimationStates] = useState<MenuItemAnimationType[]>(
    menuItems.map(() => 'pending'), // 初始默认显示
  )
  const location = useLocation()
  const handleMenuItemClick = useCallback((item: typeof menuItems[0], index: number) => {
    // 先重置所有动画状态（避免冲突）

    const newStates: MenuItemAnimationType[] = menuItemAnimationStates.map(() => 'idle')
    newStates[index] = 'click-shift-left'
    // console.log([...newStates])
    setMenuItemAnimationStates([...newStates])

    navigate(item.path)
  }, [menuItemAnimationStates, navigate])
  const handleAnimationEnd = useCallback((itemIndex: number, e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget)
      return
    // 左移结束后，切换为展开状态
    if (menuItemAnimationStates[itemIndex] === 'click-shift-left') {
      const newStates = menuItemAnimationStates.map((state, i) =>
        i === itemIndex ? 'click-expand' : state,
      )
      setMenuItemAnimationStates(newStates)
    }
  }, [menuItemAnimationStates])
  useEffect(() => {
    const allIdle: MenuItemAnimationType[] = menuItemAnimationStates.map(() => 'entering')
    // 更新状态

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuItemAnimationStates(allIdle)
  }, [setMenuItemAnimationStates])
  return (
    <main className={cn(
      'w-full h-full flex gap-4 rounded-lg shadow-custom overflow-hidden bg-mywhite',
    )}
    >
      <div
        className={clsx(
        // 基础样式：固定在左侧，白色背景，带边框
          'w-56 rounded-lg bg-white shadow-sideMenu z-20 ',
          // 动画相关样式
          'transition-all duration-500 ease-out', // 过渡效果：500ms 缓出

          // {
          // // 关闭状态：完全透明 + 向上偏移（隐藏）
          //   'opacity-0 -translate-y-full pointer-events-none': !isOpen,
          //   // 打开状态：完全不透明 + 位置复位（显示）
          //   'opacity-100 translate-y-0 pointer-events-auto': isOpen,
          // },
        )}
        style={{
        // 高度占满屏幕（或根据内容自适应）
          height: '100vh',
        }}

      >
        {' '}
        <div className="flex flex-col h-full gap-[3px]">
          <div
            className=" h-[75px] items-center flex justify-center box-border bg-blue-600 rounded-xl border-[3px] border-white duration-300 shadow-menuItem hover:scale-[102%] hover:shadow-cardEnter active:scale-95 active:shadow-cardClick"
            onClick={() => {
              navigate('/')
            }}
          >
            <div>
              <img src={Return} className="object-contain ml-2 w-[20px] h-[25px]"></img>
              <div className={clsx(
                'text-xl font-bold font-["Source_Han_Sans_CN"]',
                'text-white',
              )}
              >
                返回
              </div>
            </div>
          </div>
          {menuItems.map((item, index) => {
          // const isActive = location.pathname === index.path
            const isActive = location.pathname === item.path
            const currentState = menuItemAnimationStates[index]
            const isInteractive
              = currentState === 'click-shift-left'
                || currentState === 'click-expand'
                || isActive
            return (

              <div
                key={item.key}
                className={clsx('h-[75px] box-border bg-white rounded-xl border-[3px] border-white shadow-menuItem', isInteractive ? 'z-30 shadow-lg' : 'shadow-md', menuItemAnimationStyles[currentState])}
                style={{ transitionDelay: ['entering'].includes(currentState)
                  ? `${index * 100}ms`
                  : '0ms' }}
                onMouseDown={['entering', 'idle'].includes(currentState) ? () => handleMenuItemClick(item, index) : () => null}
                onTransitionEnd={menuItemAnimationStates[index] === 'click-shift-left'
                  ? e => handleAnimationEnd(index, e)
                  : () => null}
              >
                <div className="w-full items-center flex h-full justify-center">

                  <StatefulIcon
                    type={item.key}
                    module="bullet-chat"
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
      <div className="flex-1 p-4 bg-gray-50 h-full overflow-auto">
        <Outlet />
      </div>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 bg-blue-600 rounded"
      >
        {isOpen ? '关闭侧边栏' : '打开侧边栏'}
      </button> */}
    </main>
  )
}
