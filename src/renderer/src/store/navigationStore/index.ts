import { createStore } from '@renderer/lib'

interface NavigationStore {
  path: string
  state: Record<PropertyKey, any>
  registerNavigation: (path: string, state: Record<PropertyKey, any>) => void
}

export const useNavigationStore = createStore<NavigationStore>((setState) => ({
  path: 'home',
  state: {},
  registerNavigation: (path, state) => {
    setState({ path, state })
  }
}))
