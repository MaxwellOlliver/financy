import { createStore } from '@renderer/lib'

interface FrameStore {
  openedFiles: { id: string; name: string }[]
  activeFile: string | null
  openFiles: (files: string[]) => void
  setActiveFile: (file: string) => void
}

export const useFrameStore = createStore<FrameStore>((setState) => ({
  openedFiles: [
    {
      id: '3c83e18c-6a9f-4d91-932d-fb907a5e9148',
      name: 'Fatura 09/24'
    },
    {
      id: '3c83e18c-6a9f-4d91-932d-fb907a5e9149',
      name: 'Fatura 10/24'
    }
  ],
  activeFile: null,
  openFiles: (files) => {
    setState({ openedFiles: files.map((file) => ({ id: file, name: file })) })
  },
  setActiveFile: (file) => {
    setState({ activeFile: file })
  }
}))
