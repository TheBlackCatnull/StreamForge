const { contextBridge, ipcRenderer } = require('electron');

// 暴露有限的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message),
  onReply: (callback) => ipcRenderer.on('reply', (event, arg) => callback(arg))
});
