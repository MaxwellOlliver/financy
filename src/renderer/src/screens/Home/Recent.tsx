import { cn } from '@renderer/utils'
import { HANDLER } from '@shared/constants/handlers'
import { Clock, FileSpreadsheet } from 'lucide-react'
import { useEffect, useState } from 'react'

type RecentFile = {
  id: string
  name: string
  path: string
  updatedAt: number
}

interface RecentProps {
  onOpenFile: (path: string) => Promise<void>
}

export function Recent({ onOpenFile }: RecentProps) {
  const [recentOpened, setRecentOpened] = useState<RecentFile[]>([])

  const handleLoadRecentFiles = async () => {
    const recentFiles = await window.electron.ipcRenderer.invoke(HANDLER.STORE.RECENT_FILES.GET)

    console.log('recentFiles', recentFiles)

    setRecentOpened(recentFiles)
  }

  useEffect(() => {
    handleLoadRecentFiles()
  }, [])

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock />
        <span className="text-lg">Recentes</span>
      </div>
      <div className="flex flex-wrap gap-6 max-w-[768px] w-full">
        {recentOpened.map((file) => {
          return (
            <div
              key={file.id}
              className={cn(
                'flex flex-col items-center justify-center gap-2 bg-custombg-600',
                'text-white rounded-md p-4 px-6 hover:brightness-90',
                'transition-all duration-200 cursor-pointer'
              )}
              onClick={() => onOpenFile(file.path)}
            >
              <div className="flex flex-col items-center justify-center p-3">
                <FileSpreadsheet className="size-6" />
              </div>
              <span className="truncate text-sm"> {file.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
