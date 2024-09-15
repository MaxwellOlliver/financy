import { Button } from '@renderer/components/Button'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { cn } from '@renderer/utils'
import { debounce } from 'lodash'
import { Filter, MoreHorizontal, Search } from 'lucide-react'
import { ChangeEvent, useCallback } from 'react'

export function FormHeader() {
  const handleSearch = (e: ChangeEvent) => {
    fileBuilderEventBus.emit('search', { search: (e.target as HTMLInputElement).value })
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Search className="text-secondary size-5" />
        <input
          onChange={debouncedHandleSearch}
          type="text"
          placeholder="Pesquisar"
          className={cn(
            'w-full bg-transparent placeholder:text-[#e3e1cc80]  text-secondary text-sm rounded-md px-4 py-2.5 pl-0',
            'focus:outline-none'
          )}
        />
      </div>
      <div className="flex gap-2">
        <Button color="secondary" className="py-3 px-3">
          <Filter className="text-custombg size-4" />
        </Button>
        <Button className="py-3 px-3 bg-custombg-600 hover:bg-custombg-500">
          <MoreHorizontal className="text-secondary size-4" />
        </Button>
      </div>
    </div>
  )
}
