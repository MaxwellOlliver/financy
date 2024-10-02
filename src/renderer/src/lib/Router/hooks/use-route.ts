import { useContext, useMemo } from 'react'
import { RouterContext } from '../context'
import { Route } from '../types'

export const useRoute = <T extends Route['params']>() => {
  const ctx = useContext(RouterContext)

  if (!ctx) {
    throw new Error('useRoute must be used within a RouterProvider')
  }

  const currentRoute = useMemo(() => ctx.history[ctx.history.length - 1], [ctx.history])

  return {
    pathname: currentRoute.path,
    params: currentRoute.params as T
  }
}
