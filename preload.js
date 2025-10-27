const fs = require('node:fs')
const { contextBridge, ipcRenderer } = require('electron')

// const isDev = require('electron-is-dev')

console.log(fs)
contextBridge.exposeInMainWorld('electronAPI', {
  isDev: process.env.NODE_ENV === 'development',
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipcRenderer,
  sendMessage: message => ipcRenderer.send('message', message),
  onReply: callback => ipcRenderer.on('reply', (event, arg) => callback(arg)),
})
