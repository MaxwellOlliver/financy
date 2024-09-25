import { Portal } from '../_internal/Portal'
import { tv } from 'tailwind-variants'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@renderer/utils'

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  subTitle?: string
  /**
   * @description If true, the modal children will be unmounted when it's closed
   * @default true
   **/
  unmountOnClose?: boolean
}

const modalContent = tv({
  base: 'w-full h-fit rounded-md mt-24 mb-8 p-4 z-10 bg-custombg-600',
  variants: {
    size: {
      sm: 'max-w-lg',
      md: 'max-w-xl',
      lg: 'max-w-2xl',
      xl: 'max-w-full'
    },
    isOpen: {
      true: 'animate-scale-in',
      false: 'animate-scale-out-forwards'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export const Modal = ({
  isOpen,
  onClose,
  children,
  size,
  subTitle,
  title,
  unmountOnClose = true
}: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setShouldRender(true)
      return
    }

    if (!isOpen) {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <Portal>
      <div
        className={cn(
          'fixed',
          'w-screen',
          'h-screen',
          'inset-0',
          'z-50',
          'overflow-y-auto',

          !isOpen && 'pointer-events-none',
          !shouldRender && 'opacity-0'
        )}
      >
        <div
          className={cn(
            'min-w-full h-full sticky top-0 z-10 bg-black/0 transition-colors duration-200',
            isOpen && 'bg-black/35'
          )}
          onClick={onClose}
        ></div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-full max-w-lg">
          <div
            className={modalContent({ size, isOpen })}
            onAnimationEnd={(e) => {
              if (e.animationName === 'scale-out') {
                setShouldRender(false)
              }
            }}
          >
            <header className="flex justify-between mb-4 relative">
              <div>
                {title && <h3 className="text-lg font-semibold">{title}</h3>}
                {subTitle && <p className="text-sm text-fontColor/70">{subTitle}</p>}
              </div>
              <button
                className={cn(
                  'right-0',
                  'top-0',
                  'absolute',
                  'hover:bg-custombg-500',
                  'rounded-md',
                  'p-1',
                  'transition-colors',
                  'duration-200',
                  'focus:outline-none',
                  'focus:ring-2',
                  'focus:ring-gray-400'
                )}
                onClick={onClose}
              >
                <X className="size-5" />
              </button>
            </header>
            <main>{!unmountOnClose ? children : shouldRender && children}</main>
          </div>
        </div>
      </div>
    </Portal>
  )
}
