import { clsx } from 'clsx'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeAnimationAtom } from '@/store'
import { routeMap } from '../../router'

const { ipcRenderer } = window.electronAPI
const Footer: React.FC = () => {
  const [anime, setAnime] = useAtom(HomeAnimationAtom)
  const navigate = useNavigate()
  const modules = [
    { id: 1, name: '弹幕主模块', desc: '支持实时弹幕显示、过滤、关键词高亮', icon: '💬', size: 'col-span-2' },
    { id: 2, name: '开发中...', desc: '敬请期待', icon: '🚧' },
    { id: 3, name: '弹幕帮手网页版', desc: '多平台适配，无需安装客户端，直接在浏览器中使用', icon: '🌐' },
    { id: 4, name: '礼物快乐杯', desc: '礼物特效展示、统计分析', icon: '🎁' },
    { id: 5, name: '弹幕掉落', desc: '触发特定条件时，弹幕以动画形式掉落', icon: '🎆' },
    { id: 6, name: '设置', desc: '全局配置、样式调整、权限管理、数据备份与恢复', icon: '⚙️', size: 'row-span-2' },
    { id: 7, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },
    { id: 8, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },
    { id: 9, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },
    { id: 10, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },
    { id: 11, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },
    { id: 12, name: '开发中...', desc: '功能规划中，预计下个版本上线', icon: '🚧' },

    // 更多卡片...
  ]

  const orderMap = [0, 1, 2, 3, 4, 5, 11, 10, 9, 8, 7, 6]
  const [animationState, setAnimationState] = useState<'init' | 'active' | 'end'>('init')
  const [cardStartEnd, setcardStartEnd] = useState<boolean>(true)
  const handleCardClick = useCallback((cardId: string) => {
    const targetRoute = routeMap[cardId]
    if (targetRoute) {
      navigate(targetRoute)
    }
  }, [])

  useEffect(() => {
    if (!anime) {
      const handleStart = () => {
        setAnimationState('active')
        setAnime(true)
      }
      ipcRenderer.on('start-animation', handleStart)
      return () => {
        ipcRenderer.removeListener('start-animation', handleStart) // 必须清理
      }
    }
  }, [setAnime])
  useEffect(() => {
    if (location.pathname === '/' && anime) {
      // 1. 先重置动画状态（回到初始状态：隐藏卡片）

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnimationState('active') // 激活动画
    }
  }, [setAnime])
  return (
    <div className="container mx-auto p-4 grid gap-4 mt-10">
      {' '}
      <div className="container mx-auto p-4">
        {/* 网格布局：4列，列宽平均分配，行高自动适应内容 */}
        <div className="grid grid-cols-7 gap-4">
          {orderMap.map((index, displayOrder) => {
            const item = modules[index]
            // 判断当前卡片是否已触发动画
            const delay = `${index * 100}ms`
            return (
              <div
                key={item.id}
                className={clsx('border cursor-pointer rounded-lg ease-out p-4 shadow-sm bg-white flex flex-col relative hover:scale-105 hover:shadow-cardEnter active:scale-95 active:shadow-cardClick', {
                  'opacity-0 scale-0': animationState === 'init', // 初始状态：隐藏
                  'opacity-100 scale-100': animationState === 'active' || animationState === 'end',
                }, `${item.size ? item.size : ''}`)}

                style={{ transitionDelay: cardStartEnd ? delay : '', transitionDuration: cardStartEnd ? '500ms' : '250ms' }}
                onTransitionEnd={index === orderMap[orderMap.length - 1]
                  ? () => {
                      setcardStartEnd(false)
                    }
                  : undefined}
                onClick={() => handleCardClick(item.name)}
              >
                {/* 红色数字标记 */}
                <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {displayOrder + 1}
                </span>

                {/* 卡片内容（自动撑开高度） */}
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 flex-grow">{item.desc}</p>
                {' '}
                {/* 描述可能为空或长短不一 */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Footer
