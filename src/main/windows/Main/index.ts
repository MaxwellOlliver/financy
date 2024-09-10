import { BrowserWindow } from 'electron'
import { join } from 'path'

import { ENVIRONMENT } from '@shared/constants'
import { createWindow } from '@main/factories'

export async function MainWindow() {
  const window = createWindow({
    id: 'main',
    title: 'Financy',
    fullscreenable: true,
    show: false,
    center: true,
    movable: true,
    resizable: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    maximizable: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  window.maximize()

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  window.on('close', () => BrowserWindow.getAllWindows().forEach((window) => window.destroy()))

  return window
}
