import { Import, PlusCircle } from 'lucide-react'
import { Recent } from './Recent'
import { useFileBuilderNavigationStore } from '@renderer/store/fileBuilderNavigationStore'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { FinancyFileParser } from '@shared/lib'
import toast from 'react-hot-toast'
import { useNavigate } from '@renderer/lib/Router'

export function Home() {
  const addTab = useFileBuilderNavigationStore((s) => s.addTab)
  const getTab = useFileBuilderNavigationStore((s) => s.getTab)
  const addFile = useFileBuilderStore((s) => s.addFile)
  const registerPath = useFileBuilderStore((s) => s.registerPath)

  const { navigate } = useNavigate()

  const handleOpenFile = async (pathname?: string) => {
    const path = pathname ?? (await window.electron.ipcRenderer.invoke('open-file-dialog'))

    if (!path) {
      toast.error('Nenhum arquivo selecionado')
      return
    }

    const fileContent = await window.electron.ipcRenderer.invoke('read-file', path)

    if (!fileContent) {
      toast.error('Erro ao ler o arquivo')
      return
    }

    try {
      const fileData = await FinancyFileParser.toObject(fileContent)

      const hasTab = getTab(fileData.project.id)

      if (hasTab) {
        navigate('/builder', {
          id: fileData.project.id
        })
        return
      }

      addFile(fileData)
      addTab(fileData.project.id, fileData.project.name)
      registerPath({ filePath: path, projectId: fileData.project.id })
      navigate('/builder', {
        id: fileData.project.id
      })
    } catch (error) {
      toast.error('Arquivo inválido')
    }
  }

  return (
    <div className="h-full w-full flex flex-col p-8">
      <h2 className="text-4xl max-w-2xl font-medium mb-4">
        Gerencie seus gastos e descruba de vez pra onde vai todo seu dinheiro
      </h2>
      <h6 className="text-xl">Comece um financy do zero ou use um financy existente como base.</h6>
      <div className="flex gap-4 my-8 flex-wrap">
        <button className="bg-primary text-white rounded-md p-4 flex items-center gap-2 hover:bg-primary-700 transition-colors duration-200">
          <PlusCircle className="size-5" />
          <span className="text-base font-medium">Criar um novo financy</span>
        </button>
        <button
          onClick={() => handleOpenFile()}
          className="text-custombg bg-secondary border rounded-md p-4 flex items-center gap-2 hover:bg-secondary-700 transition-colors duration-200"
        >
          <Import className="size-5" />
          <span className="text-base font-medium">Usar um financy existente</span>
        </button>
      </div>
      <Recent onOpenFile={handleOpenFile} />
    </div>
  )
}
