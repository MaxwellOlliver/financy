import { createContext, useCallback, useState } from 'react'
import { RouteType, RouterContextType, RouterHistory, RouterProviderProps } from '../types'

export const RouterContext = createContext<RouterContextType>({
  history: [],
  navigate: () => {},
  goBack: () => {}
})

const RouterProvider = ({ children, defaultRoute }: RouterProviderProps) => {
  const [history, setHistory] = useState<RouterHistory>(() => {
    if (defaultRoute) {
      if (typeof defaultRoute === 'string') {
        return [{ path: defaultRoute }]
      }

      return [defaultRoute]
    }

    return [{ path: '/' }]
  })

  const navigate = useCallback(
    (route: RouteType | string, params?: Record<string, string | boolean | number>) => {
      if (typeof route === 'string') {
        setHistory((s) => [...s, { path: route, params }])
      } else {
        setHistory((s) => [...s, route])
      }
    },
    []
  )

  const goBack = useCallback(() => {
    setHistory((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  return (
    <RouterContext.Provider value={{ history, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  )
}

export { RouterProvider as Router }
