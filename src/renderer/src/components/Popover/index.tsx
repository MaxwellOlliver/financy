import { useCallback, useEffect, useRef, useState } from 'react'
import { FloatingElement, FloatingElementProps } from '../_internal/FloatingElement'

interface PopoverProps {
  content: React.ReactNode | ((props: { isOpen: boolean; onToggle: () => void }) => React.ReactNode)
  children:
    | React.ReactNode
    | ((props: { isOpen: boolean; onToggle: () => void }) => React.ReactNode)
  position?: FloatingElementProps['position']
  triggerOn?: 'click' | 'hover'
  closable?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

export const Popover = ({
  children,
  position,
  triggerOn = 'click',
  content,
  closable = true,
  isOpen: _isOpen,
  onToggle
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<number | null>(null)

  const toggleDropdown = useCallback(() => {
    if (!closable && isOpen) {
      return
    }

    onToggle?.()
    setIsOpen((s) => !s)
  }, [])

  useEffect(() => {
    if (_isOpen !== undefined) {
      setIsOpen(_isOpen)
    }
  }, [_isOpen])

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
    <>
      <div
        onClick={() => triggerOn === 'click' && toggleDropdown()}
        className="w-fit"
        ref={triggerRef}
        onMouseEnter={() => triggerOn === 'hover' && handleMouseInContainer()}
        onMouseLeave={() => triggerOn === 'hover' && handleMouseIsOutContainer()}
      >
        {typeof children === 'function' ? children({ isOpen, onToggle: toggleDropdown }) : children}
      </div>
      <FloatingElement
        isOpen={isOpen}
        onClose={() => closable && setIsOpen(false)}
        attachToRef={triggerRef}
        position={position}
      >
        <div
          className="popover min-w-44"
          onMouseEnter={() => triggerOn === 'hover' && handleMouseInContainer()}
          onMouseLeave={() => triggerOn === 'hover' && handleMouseIsOutContainer()}
        >
          {typeof content === 'function' ? content({ isOpen, onToggle: toggleDropdown }) : content}
        </div>
      </FloatingElement>
    </>
  )
}
