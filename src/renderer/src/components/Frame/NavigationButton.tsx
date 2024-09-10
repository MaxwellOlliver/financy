import { cn } from '@renderer/utils'

interface NavigationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive?: boolean
}

export function NavigationButton({ children, isActive, ...props }: NavigationButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'frame-button flex items-center gap-1 rounded px-3 text-secondary group transition-colors duration-200 outline-none focus:bg-custombg-600',
        'hover:bg-custombg-600',
        isActive && 'bg-secondary text-custombg hover:bg-secondary'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
