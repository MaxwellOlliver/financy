import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { AppRoutes } from './routes'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
)
