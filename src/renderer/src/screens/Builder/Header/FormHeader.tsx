import { Button } from '@renderer/components/Button'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { cn } from '@renderer/utils'
import { debounce } from 'lodash'
import { Filter, MoreHorizontal, Search } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FilterFormModal } from './FilterFormModal'

export function FormHeader() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(0)

  useEffect(() => {
    const listener = (filter) => {
      setAppliedFilters(Object.keys(filter).length)
    }
    fileBuilderEventBus.on('filter', listener)
    return () => {
      fileBuilderEventBus.off('filter', listener)
    }
  }, [])

  const togglePopover = () => {
    setIsPopoverOpen((s) => !s)
  }

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
        <Button color="secondary" className="py-3 px-3 overflow-visible" onClick={togglePopover}>
          <Filter className="text-custombg size-4 relative" />
          {appliedFilters > 0 && (
            <div className="flex items-center justify-center text-sm text-secondary size-4 bg-primary rounded-full absolute -top-2 -right-2">
              {appliedFilters}
            </div>
          )}
        </Button>
        <Button size="sm" className="py-3 px-3 bg-custombg-600 hover:bg-custombg-500">
          <MoreHorizontal className="text-secondary size-4" />
        </Button>
      </div>
      <FilterFormModal isOpen={isPopoverOpen} onClose={togglePopover} />
    </div>
  )
}
