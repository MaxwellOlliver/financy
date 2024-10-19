import { useContext, useMemo } from 'react'
import { RouterContext } from '../context'
import { RouteType } from '../types'
import { RouteInstanceContext } from '../context'

export const useRoute = <T extends RouteType['params']>() => {
  const ctx = useContext(RouterContext)
  const instanceCtx = useContext(RouteInstanceContext)

  if (!ctx) {
    throw new Error('useRoute must be used within a RouterProvider')
  }

  const currentRoute = useMemo(() => ctx.history[ctx.history.length - 1], [ctx.history])
  const sameInstanceRoutes = ctx.routes.filter((r) => r.path === instanceCtx?.route.path)

  return {
    pathname: instanceCtx?.route.path,
    params: instanceCtx?.route.params as T,
    isActive: currentRoute.path === instanceCtx?.route.path,
    sameInstanceRoutes,
    currentRoute
  }
}
