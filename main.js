const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
// 防止多开
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// 创建窗口函数
function createWindow() {
  // 新建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1000, // 窗口宽度
    height: 700, // 窗口高度
    webPreferences: {
      // 允许渲染进程使用 Node.js API（开发阶段方便调试，生产环境建议关闭）
      nodeIntegration: true,
      contextIsolation: false,
      // 若使用 React/Vue 等前端框架，需加载对应的打包产物路径
      // preload: path.join(__dirname, 'preload.js') // 可选：预加载脚本
    },
  });

  // 加载页面（根据你的项目类型选择）
   console.log('longinDev',isDev);
  if (isDev) {// 开发环境
    // 开发环境：加载本地前端服务（如 Vite 启动的 React 项目，默认端口 5173）
    //console.log('加载开发环境页面');
    mainWindow.loadURL('http://localhost:5173');
    // 打开开发者工具
   mainWindow.webContents.openDevTools({
      mode: 'detach' // 分离模式，独立窗口显示
    });
  } else {
    // 生产环境：加载打包打包后的的静态 HTML（假设前端产物在 dist 目录）
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'), // 前端打包后的 index.html 路径
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  // 窗口关闭事件
  mainWindow.on('closed', () => {
    // 清除窗口实例
    mainWindow = null;
  });
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  createWindow();

  // macOS 应用激活时重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用（Windows/Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
