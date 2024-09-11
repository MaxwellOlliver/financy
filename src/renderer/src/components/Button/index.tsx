import { UiFeedback } from '../../types'
import React, { ButtonHTMLAttributes } from 'react'
import { LucideIcon } from 'lucide-react'
import { LoaderIcon } from '../Loader'

import { buttonVariants } from './variants'
import { cn } from '@renderer/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost'
  color?: 'primary' | 'secondary' | UiFeedback
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  isLoading?: boolean
}

export const Button = ({
  children,
  size,
  className,
  color,
  variant,
  iconLeft: IconLeft,
  iconRight: IconRight,
  isLoading,
  ...props
}: ButtonProps) => {
  const { base, icon } = buttonVariants({
    size,
    variant,
    color
  })

  return (
    <button
      type="button"
      className={cn(base(), className)}
      data-variant={variant}
      data-color={color}
      {...props}
    >
      <div className="flex items-center justify-between">
        {IconLeft && (
          <span className="mr-1">
            <IconLeft className={icon()} />
          </span>
        )}
        {children}
        {IconRight && (
          <span className="ml-1">
            <IconRight className={icon()} />
          </span>
        )}
      </div>
      <div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <LoaderIcon className="stroke-white size-8" />
          </div>
        )}
      </div>
    </button>
  )
}
Button.displayName = 'Button'
