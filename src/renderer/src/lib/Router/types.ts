export type RouteType = {
  path: string
  params?: Record<string, string | number | boolean>
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
}

export interface RouterProviderProps {
  children: React.ReactNode
  defaultRoute?: RouteType | string
}

export interface RouteComponentProps {
  path: string
  children: React.ReactNode
}
