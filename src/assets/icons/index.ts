import { BulletChatIcons } from './bullet-chat'

export interface IconItem {
  default: string // 默认状态图片路径
  active: string // 激活状态图片路径
}

// 单个模块的图标集合类型（键是功能名，值是 IconItem）
export interface ModuleIconSet {
  [key: string]: IconItem
}
export const ModuleIcons = {
  'bullet-chat': BulletChatIcons,

}
export type ModuleType = keyof typeof ModuleIcons
export type ModuleIconKey<M extends ModuleType> = keyof typeof ModuleIcons[M]
