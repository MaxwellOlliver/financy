import { cn } from '@renderer/utils'
import { Clock, FileSpreadsheet } from 'lucide-react'

export function Recent() {
  const recentOpened = [
    'file1',
    'file2',
    'file3',
    'file4',
    'file5',
    'file6',
    'file7',
    'file8',
    'file9',
    'file10'
  ]
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
              key={file}
              className={cn(
                'flex flex-col items-center justify-center gap-2 bg-custombg-600',
                'text-white rounded-md p-4 px-6 hover:brightness-90',
                'transition-all duration-200 cursor-pointer'
              )}
            >
              <div className="flex flex-col items-center justify-center p-3">
                <FileSpreadsheet className="size-6" />
              </div>
              <span className="truncate text-sm"> {file}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
