import { createStore } from '@renderer/lib'
import { PurchaseData, Purchase } from '@renderer/types/financy'
import { Financy, FinancyFileParser } from '@shared/lib'
import { v4 } from 'uuid'

interface FileBuilderStore {
  files: Financy[]
  getFile: (id: string) => Financy | undefined
  initFile: (props: { projectName: string; id?: string }) => Financy
  addFile: (file: Financy) => void
  getPurchases: (projectId: string) => PurchaseData[]
  addPurchase: (projectId: string, purchase: PurchaseData) => Purchase
  removePurchase: (projectId: string, purchaseId: string) => void
  filePaths: { filePath: string; projectId: string }[]
  registerPath: (props: { filePath: string; projectId: string }) => void
  getFilePath: (projectId: string) => string | undefined
  updateProjectName: (projectId: string, name: string) => void
  removeFile: (projectId: string) => void
}

export const useFileBuilderStore = createStore<FileBuilderStore>((set, get) => ({
  files: [],
  addFile: (file) => {
    set((state) => ({
      files: [...state.files, file]
    }))
  },
  getFile: (id) => get().files.find((file) => file.project.id === id),
  getPurchases: (projectId) => {
    const file = get().getFile(projectId)

    return file ? file.purchases : []
  },
  initFile: ({ projectName, id }) => {
    const file = FinancyFileParser.create({ name: projectName, id })

    set((state) => ({
      files: [...state.files, file]
    }))
    return file
  },
  addPurchase: (projectId, purchase) => {
    const newPurchase: Purchase = { ...purchase, id: v4() }

    set((state) => ({
      files: state.files.map((file) => {
        if (file.project.id === projectId) {
          return {
            ...file,
            purchases: [...file.purchases, newPurchase]
          }
        }
        return file
      })
    }))

    return newPurchase
  },
  removePurchase: (projectId, purchaseId) => {
    set((state) => ({
      files: state.files.map((file) => {
        if (file.project.id === projectId) {
          return {
            ...file,
            purchases: file.purchases.filter((purchase) => purchase.id !== purchaseId)
          }
        }
        return file
      })
    }))
  },
  filePaths: [],
  registerPath: (props) => {
    set((state) => {
      const filtered = state.filePaths.filter((p) => p.projectId !== props.projectId)

      return {
        filePaths: [...filtered, props]
      }
    })
  },
  getFilePath: (projectId) => {
    const path = get().filePaths.find((p) => p.projectId === projectId)

    return path ? path.filePath : undefined
  },
  updateProjectName: (projectId, name) => {
    set((state) => ({
      files: state.files.map((file) => {
        if (file.project.id === projectId) {
          return {
            ...file,
            project: {
              ...file.project,
              name
            }
          }
        }
        return file
      })
    }))
  },
  removeFile: (projectId) => {
    const newArray = get().files.filter((file) => file.project.id !== projectId)

    set(() => ({
      files: newArray
    }))
  }
}))
