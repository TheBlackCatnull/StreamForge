export interface ElectronAPI {
  // 根据你的实际 API 添加具体类型
  // 例如：
  // sendMessage: (message: string) => void;
  // onMessage: (callback: (message: string) => void) => void;
  isDev: boolean
  node: () => string
  chrome: () => string
  electron: () => string
  ipcRenderer: IpcRenderer
  sendMessage: (message: string) => void
  onReply: (callback: (arg: any) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
