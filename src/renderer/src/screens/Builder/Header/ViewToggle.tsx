import { ChartPie, StretchHorizontal } from 'lucide-react'

export function ViewToggle() {
  return (
    <div className="flex items-center w-fit rounded-md bg-custombg-600">
      <button className="flex gap-2 items-center px-4 py-2.5 font-medium py-3 text-custombg text-sm bg-secondary rounded-md">
        <StretchHorizontal className="size-4" />
        <span className="text-sm">Registros</span>
      </button>
      <button className="flex gap-2 items-center px-4 font-medium py-2.5 rounded-md text-sm">
        <ChartPie className="size-4" />
        <span className="text-sm">Gráficos detalhados</span>
      </button>
    </div>
  )
}
