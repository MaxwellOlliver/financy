import { Button } from '@renderer/components/Button'
import { Popover } from '@renderer/components/Popover'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { cn } from '@renderer/utils'
import { debounce } from 'lodash'
import { Filter, MoreHorizontal, Search } from 'lucide-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { FilterForm } from './FilterForm'

export function FormHeader() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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
        <Popover
          isOpen={isPopoverOpen}
          onToggle={togglePopover}
          content={<FilterForm onToggle={togglePopover} />}
          triggerOn="click"
          position="bottom-right"
        >
          <Button color="secondary" className="py-3 px-3 overflow-visible">
            <Filter className="text-custombg size-4 relative" />
            <div className="flex items-center justify-center text-sm text-secondary size-4 bg-primary rounded-full absolute -top-2 -right-2">
              1
            </div>
          </Button>
        </Popover>
        <Button size="sm" className="py-3 px-3 bg-custombg-600 hover:bg-custombg-500">
          <MoreHorizontal className="text-secondary size-4" />
        </Button>
      </div>
    </div>
  )
}
