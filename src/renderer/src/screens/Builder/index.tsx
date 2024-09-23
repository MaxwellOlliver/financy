import { useParams } from 'react-router-dom'
import { Body } from './Body'
import { Header } from './Header'
import { useCallback, useEffect, useMemo } from 'react'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { useFileBuilderNavigationStore } from '@renderer/store/fileBuilderNavigationStore'
import { useKeyBind } from '@renderer/hooks/useKeyBind'
import { KeyBind } from '@renderer/hooks/useKeyBind/type'
import { FinancyFileParser } from '@shared/lib'
import { debounce } from 'lodash'
import toast from 'react-hot-toast'
import { HANDLER } from '@shared/constants/handlers'

export function Builder() {
  const id = useParams<{ id: string }>().id
  const initFile = useFileBuilderStore((s) => s.initFile)
  const getFile = useFileBuilderStore((s) => s.getFile)
  const registerPath = useFileBuilderStore((s) => s.registerPath)
  const getFilePath = useFileBuilderStore((s) => s.getFilePath)
  const getTab = useFileBuilderNavigationStore((s) => s.getTab)

  const handleSaveFile = useCallback(
    debounce(async () => {
      const currentFile = getFile(id!)

      if (!currentFile) return

      let filePath = getFilePath(currentFile.project.id)

      if (!filePath) {
        filePath = await window.electron.ipcRenderer.invoke('save-file-dialog', {
          fileName: currentFile.project.name
        })

        if (filePath) {
          registerPath({ filePath, projectId: currentFile.project.id })
        }
      }

      const data = FinancyFileParser.toString(currentFile)

      window.electron.ipcRenderer.send('save-file', { filePath, data })
      await window.electron.ipcRenderer.invoke(HANDLER.STORE.RECENT_FILES.REGISTER, {
        id: currentFile.project.id,
        path: filePath,
        name: currentFile.project.name,
        updatedAt: Date.now()
      })
      toast.success('Salvo!')
    }, 300),
    [id, getFile, window.Electron, getFilePath, registerPath]
  )

  const keyBinds = useMemo(
    () => [
      {
        keyCode: 'KeyS',
        ctrl: true,
        handler: handleSaveFile,
        shouldPreventDefault: true
      }
    ],
    [handleSaveFile]
  )

  useKeyBind(keyBinds as KeyBind[])

  useEffect(() => {
    if (id) {
      const currentFile = getFile(id)

      if (currentFile) return

      const currentTab = getTab(id)

      if (!currentTab) return

      initFile({ projectName: currentTab.name, id })
    }
  }, [id, initFile, getTab])

  return (
    <div className="flex justify-center w-full h-full py-12 px-8">
      <div className="flex flex-col w-full max-w-[1400px] gap-8">
        <Header />
        <Body />
      </div>
    </div>
  )
}
