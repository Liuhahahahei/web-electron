const { Tray,Menu } = require('electron')
function createTray(app,win) {
  const tray = new Tray('./icon.png')

  tray.setToolTip('我的应用')
  // 点击图标的动作
  tray.on('click', (e) => {
    // 如果按下shift加单击，则退出应用
    if (e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
    }
  })
  // 托盘菜单
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ]))
}


module.exports = createTray