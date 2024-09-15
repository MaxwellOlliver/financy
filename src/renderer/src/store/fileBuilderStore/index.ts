import { createStore } from '@renderer/lib'
import { PurchaseData, Purchase } from '@renderer/types/financy'
import { Financy, FinancyFileParser } from '@shared/lib'
import { v4 } from 'uuid'

interface FileBuilderStore {
  files: Financy[]
  getFile: (id: string) => Financy | undefined
  initFile: (props: { projectName: string; id?: string }) => Financy
  getPurchases: (projectId: string) => PurchaseData[]
  addPurchase: (projectId: string, purchase: PurchaseData) => Purchase
  removePurchase: (projectId: string, purchaseId: string) => void
}

export const useFileBuilderStore = createStore<FileBuilderStore>((set, get) => ({
  files: [],
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
  }
}))
