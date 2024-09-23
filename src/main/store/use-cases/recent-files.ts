import store, { RecentFile } from '../'

export const registerRecentFile = (file: RecentFile) => {
  const recentFiles = store.get('recentFiles', [])

  const filteredData = recentFiles.filter((recentFile) => recentFile.id !== file.id)

  store.set('recentFiles', [file, ...filteredData].slice(0, 10))
}

export const getRecentFiles = () => {
  return store.get('recentFiles', [])
}

export const removeRecentFile = (id: string) => {
  const recentFiles = store.get('recentFiles', [])

  const filteredData = recentFiles.filter((recentFile) => recentFile.id !== id)

  store.set('recentFiles', filteredData)
}
