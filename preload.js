// const fs = require('node:fs')
const { contextBridge, ipcRenderer } = require('electron')

// const isDev = require('electron-is-dev')

// console.log(fs)
contextBridge.exposeInMainWorld('electronAPI', {
  isDev: process.env.NODE_ENV === 'development',
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
    removeListener: (channel, callback) => {
      ipcRenderer.removeListener(channel, (event, ...args) => callback(...args))
    },
  },
  sendMessage: message => ipcRenderer.send('message', message),
  onReply: callback => ipcRenderer.on('reply', (event, arg) => callback(arg)),
})
