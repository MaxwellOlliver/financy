import { app, ipcMain } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock } from './factories'
import { MainWindow } from './windows'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  const mainWindow = await makeAppSetup(MainWindow)

  mainWindow.maximize()

  ipcMain.on('minimize-window', () => {
    console.log('minimize-window')
    if (mainWindow) mainWindow.minimize()
  })

  ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close()
  })

  ipcMain.on('toggle-maximize-window', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  })
})
