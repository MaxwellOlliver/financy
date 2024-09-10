import { createStore } from '@renderer/lib'

interface FrameStore {
  openedFiles: string[]
  activeFile: string | null
  openFiles: (files: string[]) => void
  setActiveFile: (file: string) => void
}

export const useFrameStore = createStore<FrameStore>((setState) => ({
  openedFiles: ['teste arquivo', 'fatura 09/20'],
  activeFile: null,
  openFiles: (files) => {
    setState((state) => ({
      openedFiles: [...state.openedFiles, ...files]
    }))
  },
  setActiveFile: (file) => {
    setState({ activeFile: file })
  }
}))
