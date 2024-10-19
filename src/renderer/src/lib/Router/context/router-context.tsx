import { createContext, useCallback, useState } from 'react'
import { RouteType, RouterContextType, RouterHistory, RouterProviderProps } from '../types'
import { isEqual } from 'lodash'

export const RouterContext = createContext<RouterContextType>({
  history: [],
  navigate: () => {},
  goBack: () => {},
  registerRoute: () => {},
  unregisterRoute: () => {},
  registerAndNavigate: () => {},
  unregisterAndNavigate: () => {},
  routes: []
})

const getDefaultRoute = (defaultRoute: string | RouteType | undefined) => {
  if (defaultRoute) {
    if (typeof defaultRoute === 'string') {
      return [{ path: defaultRoute }]
    }

    return [defaultRoute]
  }

  return [{ path: '/' }]
}

const RouterProvider = ({ children, defaultRoute }: RouterProviderProps) => {
  const [history, setHistory] = useState<RouterHistory>(getDefaultRoute(defaultRoute))
  const [registeredRoutes, setRegisteredRoutes] = useState<RouteType[]>(
    getDefaultRoute(defaultRoute)
  )

  const navigate = useCallback(
    (route: RouteType | string, params?: Record<string, string | boolean | number>) => {
      if (typeof route === 'string') {
        setHistory((s) => [...s, { path: route, ...(params ? { params } : {}) }])
      } else {
        setHistory((s) => [...s, route])
      }
    },
    [registeredRoutes]
  )

  const goBack = useCallback(() => {
    setHistory((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  const registerRoute = useCallback(
    (route: RouteType) => {
      const hasRoute = registeredRoutes.some((r) => isEqual(r, route))

      if (hasRoute) {
        return
      }

      setRegisteredRoutes((s) => [
        ...s,
        {
          path: route.path,
          params: route.params || undefined
        }
      ])
    },
    [registeredRoutes]
  )

  const unregisterRoute = useCallback((route: RouteType) => {
    setHistory((s) => s.filter((r) => !isEqual(r, route)))
    setRegisteredRoutes((s) => s.filter((r) => !isEqual(r, route)))
  }, [])

  const registerAndNavigate = useCallback(
    (route: RouteType) => {
      registerRoute(route)
      navigate(route)
    },
    [navigate, registerRoute]
  )

  const unregisterAndNavigate = useCallback(
    (route: RouteType, to: RouteType) => {
      unregisterRoute(route)
      navigate(to)
    },
    [navigate, unregisterRoute]
  )

  return (
    <RouterContext.Provider
      value={{
        history,
        navigate,
        goBack,
        registerRoute,
        registerAndNavigate,
        unregisterRoute,
        unregisterAndNavigate,
        routes: registeredRoutes
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

export { RouterProvider as Router }
