export type Route = {
  path: string
  params?: Record<string, string | number | boolean>
}

export type RouterHistory = Route[]

export interface RouterContextType {
  history: RouterHistory
  navigate: (route: Route) => void
  goBack: () => void
}

export interface RouterProviderProps {
  children: React.ReactNode
  defaultRoute?: Route | string
}
