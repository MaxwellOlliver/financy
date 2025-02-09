import { useContext } from 'react'
import { InstanceContext } from '../context/instance-context'
import { RouteType } from '../types'

export const useRouteInstance = <T>() => {
  const ctx = useContext(InstanceContext)

  if (!ctx) {
    throw new Error('useInstance must be used within a InstanceProvider')
  }

  return {
    route: ctx.route as T extends undefined ? RouteType : Required<RouteType<T>>,
    pathname: ctx?.route.path,
    params: ctx?.route.params as T,
    isActive: currentRoute.path === ctx?.route.path
  }
}
