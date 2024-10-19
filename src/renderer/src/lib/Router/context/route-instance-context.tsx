import { createContext } from 'react'
import { InstanceContextType, InstanceProviderProps } from '../types'

export const RouteInstanceContext = createContext<InstanceContextType | null>(null)

export const RouteInstanceProvider = function ({ children, route }: InstanceProviderProps) {
  return <RouteInstanceContext.Provider value={{ route }}>{children}</RouteInstanceContext.Provider>
}
