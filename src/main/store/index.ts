import Store, { Schema } from 'electron-store'

export type RecentFile = {
  id: string
  path: string
  name: string
  updatedAt: number
}

type StoreSchema = {
  recentFiles: RecentFile[]
}

const schema: Schema<StoreSchema> = {
  recentFiles: {
    type: 'array',
    default: []
  }
}

const store = new Store<StoreSchema>({ schema })

export default store
