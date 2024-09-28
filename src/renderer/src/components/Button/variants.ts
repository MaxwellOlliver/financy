import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  slots: {
    icon: 'size-4',
    base: [
      'text-white',
      'text-base',
      'px-4',
      'py-3',
      'h-fit',
      'relative',
      'overflow-hidden',
      'rounded-md',
      'transition-colors',
      'duration-200',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'flex',
      'justify-center',
      'select-none',
      'outline-none'
    ]
  },
  variants: {
    size: {
      sm: {
        icon: 'size-3',
        base: 'px-3 py-2 text-sm'
      },
      md: {
        icon: 'size-4',
        base: 'px-4 py-3 text-sm'
      },
      lg: {
        icon: 'size-5',
        base: 'px-6 py-3 text-md'
      }
    },
    variant: {
      outline: '',
      solid: '',
      ghost: {
        base: [
          'bg-gray-200',
          'text-slate-950',
          'hover:bg-gray-300',
          'active:bg-gray-400',
          'focus:ring-gray-300'
        ]
      }
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      error: '',
      info: ''
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: {
        base: ['bg-primary', 'text-white', 'hover:bg-primary-700', 'active:bg-primary-800']
      }
    },
    {
      color: 'primary',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-primary',
          'text-primary',
          'hover:bg-primary',
          'hover:text-white',
          'active:bg-primary-700'
        ]
      }
    },
    {
      color: 'secondary',
      variant: 'solid',
      class: {
        base: ['bg-secondary', 'text-custombg', 'hover:bg-secondary-700', 'active:bg-secondary-800']
      }
    },
    {
      color: 'secondary',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-secondary',
          'text-secondary',
          'hover:bg-secondary',
          'hover:text-white',
          'active:bg-secondary-700'
        ]
      }
    },
    {
      color: 'success',
      variant: 'solid',
      class: {
        base: ['bg-success', 'text-white', 'hover:bg-success-700', 'active:bg-success-800']
      }
    },
    {
      color: 'success',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-success',
          'text-success',
          'hover:bg-success',
          'hover:text-white',
          'active:bg-success-700'
        ]
      }
    },
    {
      color: 'warning',
      variant: 'solid',
      class: {
        base: ['bg-warning', 'text-white', 'hover:bg-warning-700', 'active:bg-warning-800']
      }
    },
    {
      color: 'warning',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-warning',
          'text-warning',
          'hover:bg-warning',
          'hover:text-white',
          'active:bg-warning-700'
        ]
      }
    },
    {
      color: 'error',
      variant: 'solid',
      class: {
        base: ['bg-error', 'text-white', 'hover:bg-error-700', 'active:bg-error-800']
      }
    },
    {
      color: 'error',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-error',
          'text-error',
          'hover:bg-error',
          'hover:text-white',
          'active:bg-error-700'
        ]
      }
    },
    {
      color: 'info',
      variant: 'solid',
      class: {
        base: ['bg-info', 'text-white', 'hover:bg-info-700', 'active:bg-info-800']
      }
    },
    {
      color: 'info',
      variant: 'outline',
      class: {
        base: [
          'shadow-border-info',
          'text-info',
          'hover:bg-info',
          'hover:text-white',
          'active:bg-info-700'
        ]
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'primary'
  }
})
