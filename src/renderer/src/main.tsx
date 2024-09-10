import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { AppRoutes } from './routes'
import { Frame } from './components/Frame'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="w-screen h-screen grid grid-rows-[2.5rem_1fr] bg-custombg ">
      <Frame />
      <div className="w-full h-full max-h-[calc(100vh-2.5rem)] overflow-auto">
        <AppRoutes />
      </div>
    </div>
  </React.StrictMode>
)
