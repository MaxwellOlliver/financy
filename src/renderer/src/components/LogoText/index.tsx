import { cn } from '@renderer/utils'

interface LogoTextProps {
  className?: string
}

export function LogoText({ className }: LogoTextProps) {
  return <div className={cn('text-2xl font-normal text-primary', className)}>financy</div>
}
