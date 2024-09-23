import { app } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock, setupFrame } from './factories'
import { MainWindow } from './windows'
import { storeMethods } from './factories/ipcs/store-methods'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  storeMethods()
  const mainWindow = await makeAppSetup(MainWindow)
  setupFrame({ window: mainWindow })
})
