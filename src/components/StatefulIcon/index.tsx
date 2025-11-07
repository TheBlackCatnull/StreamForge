import type { ModuleIconKey, ModuleType } from '@/assets/icons'
import { clsx } from 'clsx'
import { ModuleIcons } from '@/assets/icons'

type IconSize = number | { width: number, height: number }
interface StatefulIconProps<M extends ModuleType> {
  module: M // 模块名（如 'bullet-chat'、'user'）
  type: ModuleIconKey<M> // 该模块下的功能类型（如 'link'、'profile'）
  active?: boolean // 是否激活（切换 default/active 状态）
  size?: IconSize // 图标大小
  className?: string // 额外样式
}

export function StatefulIcon<M extends ModuleType>({
  module,
  type,
  active = false,
  size = 20,
  className,
}: StatefulIconProps<M>) {
  // 根据模块和状态获取对应图标
  const iconSrc = active
    ? ModuleIcons[module][type].active
    : ModuleIcons[module][type].default
  return (
    <img
      src={iconSrc}

      className={clsx('object-contain', className)}
      style={typeof size === 'object' ? { width: size.width, height: size.height } : { width: size, height: size }}
    />
  )
}
