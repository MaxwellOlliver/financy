import { createContext, useCallback, useState } from 'react'
import { Route, RouterContextType, RouterHistory, RouterProviderProps } from '../types'

export const RouterContext = createContext<RouterContextType>({
  history: [],
  navigate: () => {},
  goBack: () => {}
})

export const RouterProvider = ({ children, defaultRoute }: RouterProviderProps) => {
  const [history, setHistory] = useState<RouterHistory>(() => {
    if (defaultRoute) {
      if (typeof defaultRoute === 'string') {
        return [{ path: defaultRoute }]
      }

      return [defaultRoute]
    }

    return [{ path: '/' }]
  })

  const navigate = useCallback((route: Route | string) => {
    if (typeof route === 'string') {
      setHistory((s) => [...s, { path: route }])
    } else {
      setHistory((s) => [...s, route])
    }
  }, [])

  const goBack = useCallback(() => {
    setHistory((s) => s.slice(0, -1))
  }, [])

  return (
    <RouterContext.Provider value={{ history, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  )
}
