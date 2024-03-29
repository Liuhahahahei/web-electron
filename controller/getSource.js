const { ipcMain, BrowserWindow } = require("electron")
// 使用获取到的getSource函数抓取页面内容
const getSource = (url) => {
  // 异步函数，返回一个promise对象，resolve返回页面内容，reject返回错误信息，这里使用try...catch包裹，捕获异常，作用是防止程序崩溃
  return new Promise((resolve, reject) => {
    // 根据url抓取页面
    // 创建一个隐藏的窗口
    const win = new BrowserWindow({
      // 设置默认宽高
      width: 700,
      height: 500,
      // 设置窗口不可见
      show: false,
      // 让窗口只存在内存中
      webPreferences: {
        offscreen: true,
      },
    })
    // 加载url地址，让窗口在内存中加载
    win.loadURL(url)
    // 等窗口资源全部加载完成后，截取页面内容，使用saync/await处理异步
    win.webContents.on("did-finish-load", async () => {
      // 获取页面内容
      try {
        const title = win.getTitle()
        const image = await win.webContents.capturePage()
        if (!image.isEmpty()){
          const screenshot = image.toDataURL()
          resolve({ title, image, screenshot, url })
        } else {
          resolve({
            msg: "无法访问页面，请检查网络连接或url地址是否正确"
          })
        }
        
      } catch (error) {
        reject(error)
      }
    })
  })
}
// 调用ipcMain.handle注册一个ipc通信事件，接收url参数，返回页面内容
ipcMain.handle("on-url-event", async (e, url) => {
  // 使用try...catch包裹，捕获异常
  try {
    const result = await getSource(url)
    return result
  } catch (e) {
    myApi.alert(e)
  }
})
