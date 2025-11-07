const path = require('node:path')
const url = require('node:url')
const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
// 防止多开
if (!app.requestSingleInstanceLock()) {
  app.quit()
}
const preloadPath = path.resolve(__dirname, 'preload.js')//
// 创建窗口函数
let mainWindow
function createWindow() {
  // 新建浏览器窗口
  mainWindow = new BrowserWindow({ //
    width: 1340,
    height: 750,
    frame: false,
    transparent: true, // 窗口透明
    resizable: false, // 禁止调整窗口大小
    webPreferences: {
      // 允许渲染进程使用 Node.js API（开发阶段方便调试，生产环境建议关闭）
      nodeIntegration: true, //
      preload: preloadPath,
      // 若使用 React/Vue 等前端框架，需加载对应的打包产物路径
      // preload: path.join(__dirname, 'preload.js') // 可选：预加载脚本
    },
  })
  // console.log('位置', ./preload.js)
  // 加载页面（根据你的项目类型选择）
  if (isDev) { // 开发环境
    // 开发环境：加载本地前端服务（如 Vite 启动的 React 项目，默认端口 5173）
    // console.log('加载开发环境页面');
    mainWindow.loadURL('http://localhost:5173')
    // 打开开发者工具
    mainWindow.webContents.openDevTools({ mode: 'detach', // 分离模式，独立窗口显示
    })
  }
  else {
    // 生产环境：加载打包打包后的的静态 HTML（假设前端产物在 dist 目录）
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'), // 前端打包后的 index.html 路径
        protocol: 'file:',
        slashes: true,
      }),
    )
  }
  mainWindow.on('ready-to-show', () => {
    // console.log(WindowDrag)
    mainWindow.webContents.send('start-animation')
  })
  // 窗口关闭事件
  mainWindow.on('closed', () => {
    // 清除窗口实例
    mainWindow = null
  })
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  createWindow()

  // macOS 应用激活时重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  // 移除 macOS 特殊判断，所有平台关闭窗口后都退出
  app.quit() // 无论平台，关闭所有窗口后退出主进程
})
ipcMain.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})
// 所有窗口关闭时退出应用（Windows/Linux）
// app.on('window-all-closed', () => {
//   // if (process.platform !== 'darwin') {
//   //   app.quit();
//   // }
// })
ipcMain.on('message', (event, message) => {
  console.log('🎯 收到渲染进程消息:', message)

  // 模拟处理后的回复
  setTimeout(() => {
    event.reply('reply', `服务器已收到: "${message}" - 处理时间: ${new Date().toLocaleTimeString()}`)
  }, 1000)
})
