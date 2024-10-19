import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './scrollbar.css'
import { Toaster } from 'react-hot-toast'
import { Routes } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />

    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
)
