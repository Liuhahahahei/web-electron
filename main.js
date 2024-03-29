const {app, BrowserWindow} = require('electron')
// 引入electron-win-state，用于保存窗口状态
const WinState = require('electron-win-state').default
const path = require('path')
const createTray = require('./tray')
    // 监听渲染进程,获取网站截图，同时获取写在window下的getSource函数
require('./controller/getSource')
require('./controller/alert')
require('./controller/openWindow')
require('./controller/getFilelist')
require('./controller/buildMenu')
// 创建窗口函数
const createWindow = () => {
  // 实例化窗口状态，并设置默认宽高
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
    electronStoreOptions: {
      name: 'window-state-main'
    }
  })
  // 定义窗口
  const win = new BrowserWindow({
    // 挂载窗口状态
    ...winState.winOptions,
    // webPreferences，用于配置web页面
    webPreferences: {
      // 启用node, 用于使用node模块,渲染进程,预加载脚本
      preload: path.resolve(__dirname, './preload/index.js')
    },

    show: false // 隐藏窗口,防止闪烁
  })
  // 加载页面
  win.loadURL('http://localhost:5173')
  // 打开开发者工具
  // win.webContents.openDevTools()

  // 监听窗口变化
  winState.manage(win)
  // 窗口准备就绪,显示窗口
  win.on('ready-to-show', () => {
    win.show()
  })

  // 图标
  createTray(app,win)
}

app.whenReady().then(() => {
  // 创建窗口,挂载
  createWindow()
  
  // 监听窗口,如果没有窗口,则创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口被关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform!== 'darwin') app.quit()
})