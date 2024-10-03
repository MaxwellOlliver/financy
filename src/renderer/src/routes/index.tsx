import { Router, Route } from '@renderer/lib/Router'
import { Builder, Home } from '@renderer/screens'

export const Routes = () => {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/builder">
        <Builder />
      </Route>
    </Router>
  )
}
