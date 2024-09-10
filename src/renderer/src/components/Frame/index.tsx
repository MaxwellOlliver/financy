import { Minimize2, Minus, Square, X } from 'lucide-react'
import './styles.css'
import { useState } from 'react'
import { ActionButton } from './ActionButton'

export function Frame() {
  const [isMaximized, setIsMaximized] = useState(true)

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
    <div className="frame h-10 w-full bg-custombg flex justify-end">
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
