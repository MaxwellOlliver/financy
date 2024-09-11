import { cn } from '@renderer/utils'

export const inputClassNames = (props: { error: boolean; disabled: boolean }) => {
  return {
    control: cn(
      [
        'flex',
        'items-center',
        'w-full',
        'h-fit',
        'text-base',
        'px-3',
        'bg-custombg-500',
        'hover:border-gray-400',
        'transition-colors',
        'duration-200',
        'rounded-md',
        'focus-within:ring-1',
        'focus-within:ring-primary',
        'focus-within:border-primary',
        'focus-within:hover:border-primary'
      ].join(' '),
      props.error &&
        !props.disabled &&
        'border-error hover:border-error focus-within:ring-error focus-within:border-error focus-within:hover:border-error',
      props.disabled && 'pointer-events-none bg-gray-100'
    ),
    input:
      'outline-none bg-custombg-500 py-3 placeholder:text-custombg-300 w-full text-sm no-arrow mx-0.5 transition-colors duration-200'
  }
}
