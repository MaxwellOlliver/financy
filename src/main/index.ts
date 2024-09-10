import { app } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock, setupFrame } from './factories'
import { MainWindow } from './windows'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  const mainWindow = await makeAppSetup(MainWindow)
  setupFrame({ window: mainWindow })
})
