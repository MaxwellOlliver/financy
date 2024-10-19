export type RouteType<T = Record<string, string | number | boolean>> = {
  path: string
  params?: T
}

export type NavigateFn = {
  (route: string, params?: Record<string, string | number | boolean>): void
  (route: RouteType): void
}

export type RouterHistory = RouteType[]

export interface RouterContextType {
  history: RouterHistory
  navigate: NavigateFn
  goBack: () => void
  registerRoute: (route: RouteType) => void
  unregisterRoute: (route: RouteType) => void
  registerAndNavigate: (route: RouteType) => void
  unregisterAndNavigate: (route: RouteType, to: RouteType) => void
  routes: RouteType[]
}

export interface RouterProviderProps {
  children: React.ReactNode
  defaultRoute?: RouteType | string
}

export interface RouteComponentProps {
  path: string
  children: React.ReactNode
}

export type InstanceContextType = {
  route: RouteType
}

export type InstanceProviderProps = {
  children: React.ReactNode
  route: RouteType
}
