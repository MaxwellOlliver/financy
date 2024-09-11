import { Import, PlusCircle } from 'lucide-react'
import { Recent } from './Recent'

export function Home() {
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
        <button className="text-custombg bg-secondary border rounded-md p-4 flex items-center gap-2 hover:bg-secondary-700 transition-colors duration-200">
          <Import className="size-5" />
          <span className="text-base font-medium">Usar um financy existente</span>
        </button>
      </div>
      <Recent />
    </div>
  )
}
