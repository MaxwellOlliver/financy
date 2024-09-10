import { ipcMain } from 'electron'

import { SetupFrame } from '@shared/types'
import { IPC } from '@shared/constants'

export function setupFrame({ window }: SetupFrame) {
  window.maximize()

  window.on('unmaximize', () => {
    window.webContents.send(IPC.FRAME.WINDOW_UNMAXIMIZE, false)
  })

  window.on('maximize', () => {
    window.webContents.send(IPC.FRAME.WINDOW_UNMAXIMIZE, true)
  })

  ipcMain.on(IPC.FRAME.MINIMIZE, () => {
    if (window) window.minimize()
  })

  ipcMain.on(IPC.FRAME.CLOSE, () => {
    if (window) window.close()
  })

  ipcMain.on(IPC.FRAME.TOGGLE_MAXIMIZE, () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })
}
