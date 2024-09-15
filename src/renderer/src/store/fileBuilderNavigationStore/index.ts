import { createStore } from '@renderer/lib'

type Tab = { id: string; name: string }

interface FileBuilderNavigationStore {
  tabs: Tab[]
  addTab: (id: string, name: string) => void
  getTab: (file: string) => Tab | undefined
}

export const useFileBuilderNavigationStore = createStore<FileBuilderNavigationStore>(
  (set, get) => ({
    tabs: [],
    addTab: (id, name) => {
      const state = get()

      set({ tabs: [...state.tabs, { id, name }] })
    },
    getTab: (id) => {
      const state = get()

      return state.tabs.find((tab) => tab.id === id)
    }
  })
)
