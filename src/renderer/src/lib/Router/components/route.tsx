import { useContext } from 'react'
import { RouterContext } from '../context'
import { useRoute } from '../hooks'
import { RouteComponentProps } from '../types'
import { RouteInstanceProvider } from '../context'
import { isEqual } from 'lodash'

export const Route = ({ children, path }: RouteComponentProps) => {
  const { currentRoute } = useRoute()
  const ctx = useContext(RouterContext)

  const instances = ctx.routes.filter((r) => r.path === path)

  return (
    <>
      {instances.map((r, i) => (
        <RouteInstanceProvider key={i} route={r}>
          <div key={i} className={isEqual(r, currentRoute) ? 'contents' : 'hidden'}>
            {children}
          </div>
        </RouteInstanceProvider>
      ))}
    </>
  )
}
