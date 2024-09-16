import { useParams } from 'react-router-dom'
import { Body } from './Body'
import { Header } from './Header'
import { useEffect } from 'react'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { useFileBuilderNavigationStore } from '@renderer/store/fileBuilderNavigationStore'

export function Builder() {
  const id = useParams<{ id: string }>().id
  const initFile = useFileBuilderStore((s) => s.initFile)
  const getFile = useFileBuilderStore((s) => s.getFile)
  const getTab = useFileBuilderNavigationStore((s) => s.getTab)

  useEffect(() => {
    if (id) {
      const currentFile = getFile(id)

      if (currentFile) return

      const currentTab = getTab(id)

      if (!currentTab) return

      initFile({ projectName: currentTab.name, id })
    }
  }, [id, initFile, getTab])

  return (
    <div className="flex justify-center w-full h-full py-12 px-8">
      <div className="flex flex-col w-full max-w-[1400px] gap-8">
        <Header />
        <Body />
      </div>
    </div>
  )
}
