import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/utils/ui'

// 定义按钮样式变体（基于原按钮特性扩展）
const returnButtonVariants = cva(
  // 基础样式：保留原按钮核心样式（圆角、居中、过渡等）
  'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all',
  {
    variants: {
      // 主色调变体（默认绿色，可扩展其他颜色）
      variant: {
        default: 'bg-white text-black group', // 原按钮样式
        primary: 'bg-slate-900 text-white', // 深色变体
        secondary: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white', // 灰色变体
      },
      // 尺寸变体（控制宽高）
      size: {
        default: 'w-48 h-14 text-xl', // 原按钮尺寸
        sm: 'w-40 h-12 text-base', // 小尺寸
        lg: 'w-56 h-16 text-2xl', // 大尺寸
      },
      slide: {

      },
      // 滑块颜色变体
      sliderColor: {
        default: 'bg-white', // 原绿色滑块
        blue: 'bg-blue-400',
        red: 'bg-red-400',
        purple: 'bg-purple-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      sliderColor: 'default',
    },
  },
)
const sliderVariants = cva(
  // 滑块基础样式（定位、布局等固定样式）
  'absolute flex items-center justify-center z-10 transition-all',
  {
    variants: {
      // 滑块颜色（独立控制，不继承按钮）
      color: {
        default: 'bg-green-400',
        blue: 'bg-blue-400',
        red: 'bg-red-400',
        purple: 'bg-purple-400',
      },
      // 初始宽度 + 动画时长
      size: {
        default: 'w-1/4 duration-500 left-1 top-[4px] h-12 group-hover:w-[184px]',
        sm: 'w-1/3 duration-700',
        lg: 'w-1/5 duration-300',
      },
      // 圆角
      radius: {
        default: 'rounded-xl',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'default',
      radius: 'default',
    },
  },
)
// 组件属性类型：继承按钮原生属性 + 变体属性 + 自定义内容
export interface ReturnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof returnButtonVariants> {
  /** 按钮文字内容（默认："Go Back"） */
  text?: string
  /** 图标尺寸（默认：25px） */
  iconSize?: number
  /** 点击事件回调 */
  onClick?: () => void
}

// 可复用返回按钮组件
const ReturnButton = React.forwardRef<HTMLButtonElement, ReturnButtonProps>(
  (
    {
      className,
      variant,
      size,
      sliderColor,
      text = 'Go Back',
      iconSize = 25,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(returnButtonVariants({ variant, size, sliderColor, className }))}
        onClick={onClick}
        type="button"
        {...props}
      >
        {/* 滑动块 */}
        <div className={cn(sliderVariants({ size }))}>
          {/* 返回箭头图标 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height={iconSize}
            width={iconSize}
            className="text-black"
          >
            <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="currentColor" />
            <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="currentColor" />
          </svg>
        </div>
        {/* 按钮文字 */}

        {children || <p className="translate-x-2">text</p>}

      </button>
    )
  },
)

ReturnButton.displayName = 'ReturnButton'

export default ReturnButton
