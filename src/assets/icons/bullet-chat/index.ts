import ComponentActive from './active/component.png'
import DisplayActive from './active/display.png'
// ...其他默认图标

import HistorActive from './active/history.png'
import LinkActive from './active/link.png'
import RenderActive from './active/render.png'
import ComponentDefault from './default/component.png'
import DisplayDefault from './default/display.png'
import HistoryDefault from './default/history.png'
import LinkDefault from './default/link.png'
import RenderDefault from './default/render.png'
// 导入激活（蓝色）图标
export interface IconItem {
  default: string // 默认状态图片路径
  active: string // 激活状态图片路径
}

// 单个模块的图标集合类型（键是功能名，值是 IconItem）
export interface ModuleIconSet {
  [key: string]: IconItem
}

export const BulletChatIcons: ModuleIconSet = {
  link: {
    default: LinkDefault,
    active: LinkActive,
  },
  component: {
    default: ComponentDefault,
    active: ComponentActive,
  },
  display: {
    default: DisplayDefault,
    active: DisplayActive,
  },
  render: {
    default: RenderDefault,
    active: RenderActive,
  },
  history: {
    default: HistoryDefault,
    active: HistorActive,
  },
  // ...其他功能
}
export type BulletChatIconKey = keyof typeof BulletChatIcons
