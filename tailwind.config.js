/** @type {import('tailwindcss').Config} */

import { tailwindConfig } from './src/renderer/src/layout/config/tailwind'

export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: tailwindConfig
  },
  darkMode: 'class',
  plugins: []
}
