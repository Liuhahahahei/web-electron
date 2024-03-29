const { contextBridge, ipcRenderer } = require('electron')
const { on } = require('events')
// 定义一个函数，用于向主进程发送消息，实现通信
const sendUrl = async (url) => {
  let result = await ipcRenderer.invoke('on-url-event',url)
  return result
}

const alert = (msg) => {
  ipcRenderer.invoke('on-alert-event', msg)
}

const open = (url) => {
  ipcRenderer.invoke('on-open-window', url) 
}

const close = () => {
  ipcRenderer.invoke('on-close-window')
}

const getFileList = async () => {
  const fileList = await ipcRenderer.invoke('on-getfiles-event')
  return fileList
}

const opendialog = () => {
  ipcRenderer.send('on-opendialog-event')
}

const onRendererEvent = (cb) => {
  ipcRenderer.on('on-renderer-event', (e,msg) => {
    cb()
  })
}
// 把函数暴露给主进程
contextBridge.exposeInMainWorld('myApi', {
  sendUrl,
  alert,
  open,
  close,
  getFileList,
  opendialog,
  onRendererEvent
})