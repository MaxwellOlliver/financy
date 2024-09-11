import { cn } from '@renderer/utils'
import { Settings } from 'lucide-react'

export function Navbar() {
  return (
    <div className={cn('h-[40px] flex justify-end px-4')}>
      <button className="text-secondary p-2 rounded-md hover:bg-custombg-600">
        <Settings className="size-5" />
      </button>
    </div>
  )
}
