import { FileSpreadsheet, Home, Minimize2, Minus, Plus, Square, X } from 'lucide-react'
import './styles.css'
import { Fragment, useEffect, useState } from 'react'
import { ActionButton } from './ActionButton'
import { NavigationButton } from './NavigationButton'
import { IPC } from '@shared/constants/ipc'
import { cn } from '@renderer/utils'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useFileBuilderNavigationStore } from '@renderer/store/fileBuilderNavigationStore'
import { v4 } from 'uuid'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'

export function Frame() {
  const [isMaximized, setIsMaximized] = useState(true)
  const openedFiles = useFileBuilderNavigationStore((s) => s.tabs)
  const addTab = useFileBuilderNavigationStore((s) => s.addTab)
  const closeTab = useFileBuilderNavigationStore((s) => s.closeTab)
  const removeFile = useFileBuilderStore((s) => s.removeFile)

  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.pathname)

  useEffect(() => {
    window.electron.ipcRenderer.on(IPC.FRAME.WINDOW_UNMAXIMIZE, (_, isMaximized) => {
      setIsMaximized(isMaximized)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners(IPC.FRAME.WINDOW_UNMAXIMIZE)
    }
  }, [])

  const handleMinimize = () => {
    window.electron.ipcRenderer.send(IPC.FRAME.MINIMIZE)
  }

  const handleToggleMaximize = () => {
    window.electron.ipcRenderer.send(IPC.FRAME.TOGGLE_MAXIMIZE)
    setIsMaximized(!isMaximized)
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send(IPC.FRAME.CLOSE)
  }

  const handleNavigate = (id: string) => {
    navigate(`/builder/${encodeURIComponent(id)}`)
  }

  const handleOpenNewFile = () => {
    const id = v4()

    addTab(id, 'Novo financy')
    handleNavigate(id)
  }

  const handleTabClose = (id: string) => {
    closeTab(id)
    removeFile(id)
    navigate('/')
  }

  return (
    <div className="w-screen h-screen grid grid-rows-[3rem_1fr] bg-custombg ">
      <div className="frame h-12 w-full bg-custombg flex justify-between">
        <div className="p-1.5 flex gap-1 items-center">
          <NavigationButton isActive={location.pathname === '/'} onClick={() => navigate('/')}>
            <Home className="size-4" />
          </NavigationButton>
          <div className={cn('divider  h-[30%] w-[1px] bg-secondary opacity-50')}></div>
          {openedFiles.map((tab) => {
            return (
              <Fragment key={tab.id}>
                <NavigationButton
                  onClick={() => handleNavigate(tab.id)}
                  isActive={location.pathname === `/builder/${encodeURIComponent(tab.id)}`}
                >
                  <FileSpreadsheet className="size-4" />
                  <span className="text-xs">{tab.name}</span>
                  <X
                    className="opacity-0 ml-2 group-hover:opacity-100 size-3"
                    onClick={() => handleTabClose(tab.id)}
                  />
                </NavigationButton>

                <div className={cn('divider  h-[30%] w-[1px] bg-secondary opacity-50')}></div>
              </Fragment>
            )
          })}
          <NavigationButton onClick={handleOpenNewFile}>
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
      <div className="w-full h-full max-h-[calc(100vh-3rem)] overflow-auto relative">
        <Outlet />
      </div>
    </div>
  )
}
