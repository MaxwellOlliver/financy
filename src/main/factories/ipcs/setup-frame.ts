import { ipcMain } from 'electron'

import { SetupFrame } from '@shared/types'

export function setupFrame({ window }: SetupFrame) {
  window.maximize()

  window.on('unmaximize', () => {
    window.webContents.send('window-unmaximize', false)
  })

  window.on('maximize', () => {
    window.webContents.send('window-unmaximize', true)
  })

  ipcMain.on('minimize-window', () => {
    if (window) window.minimize()
  })

  ipcMain.on('close-window', () => {
    if (window) window.close()
  })

  ipcMain.on('toggle-maximize-window', () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })
}
