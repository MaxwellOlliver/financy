import { useRef, useState } from 'react'
import { FloatingElement, FloatingElementProps } from '../_internal/FloatingElement'
import { DropdownItem } from './types'
import { cn } from '@renderer/utils'

interface DropdownProps {
  items: DropdownItem[]
  disabled?: boolean
  children: React.ReactNode
  position?: FloatingElementProps['position']
  triggerOn?: 'click' | 'hover'
}

export const Dropdown = ({
  children,
  items = [],
  disabled,
  position,
  triggerOn = 'click'
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<number | null>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const clickInternal = (event: React.MouseEvent, item: DropdownItem) => {
    event.stopPropagation()
    setIsOpen(false)
    item.onClick && item.onClick()
  }

  const handleMouseInContainer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }

  const handleMouseIsOutContainer = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  return (
    <div>
      <div
        onClick={() => triggerOn === 'click' && toggleDropdown()}
        className="w-fit"
        ref={triggerRef}
        onMouseEnter={() => triggerOn === 'hover' && handleMouseInContainer()}
        onMouseLeave={() => triggerOn === 'hover' && handleMouseIsOutContainer()}
      >
        {children}
      </div>
      <FloatingElement
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        attachToRef={triggerRef}
        position={position}
      >
        <div
          className="min-w-44"
          onMouseEnter={() => triggerOn === 'hover' && handleMouseInContainer()}
          onMouseLeave={() => triggerOn === 'hover' && handleMouseIsOutContainer()}
        >
          <ul className="flex flex-col w-full">
            {items.map((item, index) => (
              <li className="w-full border-b border-gray-200 last:border-none" key={index}>
                <button
                  className={cn(
                    'p-4',
                    'py-3',
                    'flex',
                    'items-center',
                    'gap-2',
                    'hover:bg-gray-100',
                    'w-full',
                    'disabled:bg-gray-100',
                    'disabled:opacity-50'
                  )}
                  onClick={(e) => clickInternal(e, item)}
                  disabled={disabled ?? item.disabled}
                >
                  {item.icon && <item.icon className="size-4" />}
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </FloatingElement>
    </div>
  )
}
