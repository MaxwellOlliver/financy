import { Config } from 'tailwindcss/types/config'
import { theme } from '../theme'

export const tailwindConfig: Config['theme'] = {
  colors: theme.colors,
  fontFamily: {
    sans: ['"Bai Jamjuree"', 'sans-serif']
  },
  keyframes: {
    'scale-in': {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' }
    },
    'scale-out': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '100%': { transform: 'scale(0.9)', opacity: '0' }
    },
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' }
    },
    'fade-out': {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' }
    },
    'slide-enter': {
      '0%': { transform: 'translateY(-100%) scale(0.5)', opacity: '0' },
      '100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
    },
    'slide-leave': {
      '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
      '100%': { transform: 'translateY(-100%) scale(0.5)', opacity: '0' }
    }
  },
  animation: {
    'scale-in': 'scale-in 0.2s ease',
    'scale-out': 'scale-out 0.2s ease',
    'scale-out-forwards': 'scale-out 0.2s ease forwards',
    'fade-in': 'fade-in 0.2s ease',
    'fade-out': 'fade-out 0.2s ease',
    'fade-out-forwards': 'fade-out 0.2s ease forwards',
    'fade-in-forwards': 'fade-in 0.2s ease forwards',
    'slide-enter': 'slide-enter 0.2s cubic-bezier(0.21, 1.02, 0.73, 1) forwards',
    'slide-leave': 'slide-leave 0.2s cubic-bezier(0.21, 1.02, 0.73, 1) forwards'
  },
  boxShadow: {
    'border-primary': 'inset 0 0 0 2px #2C6E49',
    'border-secondary': 'inset 0 0 0 2px #8B4513',
    'border-success': 'inset 0 0 0 2px #10B981',
    'border-warning': 'inset 0 0 0 2px #F59E0B',
    'border-error': 'inset 0 0 0 2px #EF4444',
    'border-info': 'inset 0 0 0 2px #3B82F6',
    'border-white': 'inset 0 0 0 2px #fff',
    'border-neutral': 'inset 0 0 0 2px #333'
  }
}
