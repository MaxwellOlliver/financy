import { Router, Route } from 'electron-router-dom'
import { Home } from './screens'

export function AppRoutes() {
  return <Router main={<Route path="/" element={<Home />} />} />
}
