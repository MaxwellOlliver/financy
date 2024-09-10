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
        'frame-button px-3 text-secondary hover:bg-custombg-600 transition-colors duration-200',
        isClose && 'bg-[#C94A4A] hover:bg-[#d45858]'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
