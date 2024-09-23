import { ipcMain } from 'electron'

import {
  registerRecentFile,
  getRecentFiles,
  removeRecentFile
} from '@main/store/use-cases/recent-files'
import { HANDLER } from '@shared/constants/handlers'

type AddRecentFileHandlerPayload = {
  id: string
  path: string
  name: string
  updatedAt: number
}

export function storeMethods() {
  ipcMain.handle(HANDLER.STORE.RECENT_FILES.REGISTER, (_, file: AddRecentFileHandlerPayload) => {
    return registerRecentFile(file)
  })
  ipcMain.handle(HANDLER.STORE.RECENT_FILES.GET, () => {
    return getRecentFiles()
  })
  ipcMain.handle(HANDLER.STORE.RECENT_FILES.REMOVE, (_, id: string) => {
    return removeRecentFile(id)
  })
}
