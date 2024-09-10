import { createStore } from '@renderer/lib'

interface FrameStore {
  openedFiles: string[]
  activeFile: string | null
  openFiles: (files: string[]) => void
}

export const useFrameStore = createStore<FrameStore>((setState) => ({
  openedFiles: ['teste arquivo'],
  activeFile: null,
  openFiles: (files) => {
    setState((state) => ({
      openedFiles: [...state.openedFiles, ...files]
    }))
  }
}))
