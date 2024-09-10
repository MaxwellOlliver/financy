import { Router, Route } from 'electron-router-dom'
import { Builder, Home } from './screens'
import { Frame } from './components/Frame'

export function AppRoutes() {
  return (
    <Router
      main={
        <Route path="/" element={<Frame />}>
          <Route index element={<Home />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/file" element={<h4>file</h4>} />
        </Route>
      }
    />
  )
}
