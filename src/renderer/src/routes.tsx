import { Router, Route } from 'electron-router-dom'
import { Builder, Home } from './screens'
import { Frame } from './components/Frame'
import { Dashboard } from './layout/components/Dashboard'
import { Navigate } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Router
      main={
        <Route path="/" element={<Frame />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Dashboard />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/builder/:id" element={<Builder />} />
        </Route>
      }
    />
  )
}
