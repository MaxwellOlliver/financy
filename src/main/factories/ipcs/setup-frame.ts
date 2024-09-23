import { app, dialog, ipcMain } from 'electron'

import { SetupFrame } from '@shared/types'
import { IPC } from '@shared/constants'
import path from 'path'
import { readFileSync, writeFile } from 'fs'

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

  ipcMain.handle('save-file-dialog', async (_, data) => {
    const result = await dialog.showSaveDialog({
      title: 'Salvar arquivo',
      defaultPath: path.join(app.getPath('documents'), `${data.fileName}.fy`),
      buttonLabel: 'Salvar',
      filters: [
        { name: 'Financy', extensions: ['fy'] },
        { name: 'Todos os arquivos', extensions: ['*'] }
      ]
    })

    if (!result.canceled) {
      return result.filePath
    }

    return null
  })

  ipcMain.on('save-file', (event, { filePath, data }) => {
    writeFile(filePath, data, (err) => {
      if (err) {
        console.error('Error saving the file:', err)
        event.sender.send('file-save-failed', err.message)
      } else {
        event.sender.send('file-save-success', 'File saved successfully!')
      }
    })
  })

  ipcMain.handle('open-file-dialog', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Abrir arquivo',
      buttonLabel: 'Abrir',
      filters: [
        { name: 'Financy', extensions: ['fy'] },
        { name: 'Todos os arquivos', extensions: ['*'] }
      ],
      properties: ['openFile']
    })

    if (!result.canceled) {
      return result.filePaths[0]
    }

    return null
  })

  ipcMain.handle('read-file', async (_, filePath) => {
    const content = readFileSync(filePath, 'utf-8')

    return content
  })
}
