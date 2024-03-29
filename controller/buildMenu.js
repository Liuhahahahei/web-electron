const { app, Menu, ipcMain } = require("electron")

const isMac = process.platform === "darwin"
let event = null
ipcMain.on("on-opendialog-event", (e, arg) => {
  event = e
  // e.sender.send('')
})
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "文件",
    submenu: [isMac ? { role: "close",label: "关闭窗口" } : { role: "quit",label: "退出" }],
  },
  // { role: 'editMenu' }
  {
    label: "编辑",
    submenu: [
      { role: "undo",label: "撤销" },
      { role: "redo",label: "重做" },
      { type: "separator" },
      { role: "cut",label: "剪切" },
      { role: "copy",label: "复制" },
      { role: "paste",label: "粘贴" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete",label: "删除" }, { type: "separator" }, { role: "selectAll",label: "全选" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "视图",
    submenu: [
      { role: "reload",label: "刷新" },
      { role: "forceReload",label: "强制刷新" },
      { role: "toggleDevTools",label: "开发者工具" },
      { type: "separator" },
      { role: "resetZoom",label: "重置缩放" },
      { role: "zoomIn",label: "放大" },
      { role: "zoomOut",label: "缩小" },
      { type: "separator" },
      { role: "togglefullscreen",label: "全屏" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "系统",
    submenu: [
      { role: "minimize",label: "最小化" },
      { role: "zoom",label: "缩放" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close",label: "关闭" }]),
    ],
  },
  { 

    label: "帮助",
    role: "help",
    submenu: [
      {
        label: "关于 Electron",
        click: async () => {
          const { shell } = require("electron")
          await shell.openExternal("https://electronjs.org")
        },
      },
    ],
  },
  {
    label: "操作",
    submenu: [
      {
        label: "添加",
        click: () => {
          event.sender.send("on-renderer-event", "add")
        },
        accelerator: "Ctrl + N"
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
