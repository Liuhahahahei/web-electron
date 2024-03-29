const { contextBridge, ipcRenderer } = require('electron')

const close = () => {
  ipcRenderer.invoke('on-close-window')
}
// 把函数暴露给主进程
contextBridge.exposeInMainWorld('myApi', {
  close
})