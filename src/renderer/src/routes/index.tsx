import { Frame } from '@renderer/components/Frame'
import { Dashboard } from '@renderer/layout/components/Dashboard'
import { Router, Route } from '@renderer/lib/router'
import { Builder } from '@renderer/screens'

export const Routes = () => {
  return (
    <Router>
      <Frame>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/builder">
          <Builder />
        </Route>
      </Frame>
    </Router>
  )
}
