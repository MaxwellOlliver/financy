import { FileSpreadsheet, Home, Minimize2, Minus, Plus, Square, X } from 'lucide-react'
import './styles.css'
import { useEffect, useState } from 'react'
import { ActionButton } from './ActionButton'
import { useFrameStore } from '@renderer/store/frameStore'
import { NavigationButton } from './NavigationButton'

export function Frame() {
  const [isMaximized, setIsMaximized] = useState(true)
  const { activeFile, openedFiles } = useFrameStore((state) => state)

  useEffect(() => {
    window.electron.ipcRenderer.on('window-unmaximize', (_, isMaximized) => {
      setIsMaximized(isMaximized)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('window-unmaximize')
    }
  }, [])

  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  const handleToggleMaximize = () => {
    window.electron.ipcRenderer.send('toggle-maximize-window')
    setIsMaximized(!isMaximized)
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  return (
    <div className="frame h-10 w-full bg-custombg flex justify-between">
      <div className="p-1 flex gap-1">
        <NavigationButton isActive>
          <Home className="size-4" />
        </NavigationButton>
        {openedFiles.map((file) => (
          <NavigationButton key={file}>
            <FileSpreadsheet className="size-4" />
            <span className="text-xs">{file}</span>
            <X className="opacity-0 group-hover:opacity-100 size-3" />
          </NavigationButton>
        ))}
        <NavigationButton>
          <Plus className="size-4" />
        </NavigationButton>
      </div>
      <div className="flex">
        <ActionButton onClick={handleMinimize}>
          <Minus className="size-3" />
        </ActionButton>
        <ActionButton onClick={handleToggleMaximize}>
          {isMaximized ? (
            <Minimize2 className="size-3" />
          ) : (
            <Square className="size-3 color-secondary" />
          )}
        </ActionButton>
        <ActionButton onClick={handleClose} isClose>
          <X className="size-4" />
        </ActionButton>
      </div>
    </div>
  )
}
