const { ipcMain,BrowserWindow } = require('electron')
const WinState = require('electron-win-state').default
const path = require('path')
const saveas = require('./saveas.js') 

const cssText = `width: 80px;height: 35px;background-color: cornflowerblue;border-radius: 5px; line-height: 35px; text-align: center;position: fixed;bottom: 50px;right: 20px; color: white;font-weight: bold;cursor: pointer;`

// 使用js写一个按钮
const js = `
  const div = document.createElement('div')
  div.id = 'readit-btn'
  div.innerHTML = '关闭窗口'
  div.style.cssText = '${cssText}'
  div.addEventListener('click',() => { window.myApi.close() })
  document.body.appendChild(div)
`
let win = null

ipcMain.handle('on-open-window', (e,url) => {
  const winState = new WinState({
    defaultWidth: 800,
    defaultHeight: 1200,
    electronStoreOptions: {
      name: 'window-state-open'
    }
  })
  win = new BrowserWindow({
    ...winState.winOptions,
    show:false,
    webPreferences: {
      preload: path.resolve(__dirname,'../preload/open.js')
    }
  })
  win.once('ready-to-show',() => {
    win.show()
  })
  win.loadURL(url)
  winState.manage(win)

  win.webContents.executeJavaScript(js).then(() => {}).catch(() => {})

  win.webContents.on('context-menu',(e,args) => {
    saveas(args.srcURL)
  })
}) 

ipcMain.handle('on-close-window', (e) => {
  win.close()
  console.log(0);
})