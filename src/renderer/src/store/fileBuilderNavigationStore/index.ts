import { createStore } from '@renderer/lib'

type Tab = { id: string; name: string }

interface FileBuilderNavigationStore {
  tabs: Tab[]
  addTab: (id: string, name: string) => void
  getTab: (file: string) => Tab | undefined
  updateTabName: (id: string, name: string) => void
  closeTab: (id: string) => void
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
    },
    updateTabName: (id, name) => {
      const state = get()

      set({
        tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, name } : tab))
      })
    },
    closeTab: (id) => {
      const newArray = get().tabs.filter((tab) => tab.id !== id)

      set({ tabs: newArray })
    }
  })
)
