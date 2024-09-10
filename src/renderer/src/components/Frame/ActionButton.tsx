import { cn } from '@renderer/utils'

interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isClose?: boolean
}

export function ActionButton({ children, isClose, ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'frame-button px-3 text-secondary hover:bg-custombg-600 transition-colors duration-200 outline-none focus:bg-custombg-600',
        isClose && 'hover:bg-[#C94A4A] focus:bg-[#C94A4A]'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
