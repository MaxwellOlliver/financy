import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { formatCurrency } from '@renderer/utils'
import { categories } from '@renderer/constants/category'
import { PurchaseData } from '@renderer/types/financy'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { Crown } from 'lucide-react'

function ChartsComponent() {
  const id = useParams<{ id: string }>().id
  const getFile = useFileBuilderStore((state) => state.getFile)

  const [purchases, setPurchases] = useState<PurchaseData[]>(() =>
    id ? (getFile(id)?.purchases ?? []) : []
  )

  useEffect(() => {
    const listener = () => {
      if (!id) return

      setPurchases(getFile(id)?.purchases ?? [])
    }

    fileBuilderEventBus.on('add-purchase', listener)

    return () => {
      fileBuilderEventBus.off('add-purchase', listener)
    }
  }, [id])

  const totalRegistered = purchases.reduce((acc, purchase) => acc + purchase.value, 0)

  const totalByCategory = purchases.reduce(
    (acc, purchase) => {
      const category = purchase.category
      if (!category) return acc

      if (!acc[category]) {
        acc[category] = 0
      }

      acc[category] += purchase.value

      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full bg-custombg-600 rounded-md p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-primary">Total registrado</h2>
          <span className="text-custombg-300 text-sm">{purchases.length} registrados</span>
        </div>
        <span className="text-lg">{formatCurrency(totalRegistered, 'BRL', true)}</span>
      </div>
      <div className="w-full bg-custombg-600 rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-primary">Total por categoria</h2>
          <span className="text-custombg-300 text-sm">Top 5</span>
        </div>
        <ul className="flex flex-col gap-4">
          {Object.entries(totalByCategory)
            .slice(0, 5)
            .sort((a, b) => b[1] - a[1])
            .map(([category, total], index) => {
              const categoryData = categories.find((c) => c.value === category)

              if (!categoryData) return null

              return (
                <li className="flex justify-between" key={category}>
                  <div className="flex items-center gap-2">
                    <categoryData.icon
                      className="size-4"
                      style={{
                        color: categoryData.color
                      }}
                    />
                    <span className="text-sm">{categoryData.name}</span>
                    {index === 0 && <Crown className="size-3 text-yellow-600" />}
                  </div>
                  <span className="text-sm">{formatCurrency(total, 'BRL')} R$</span>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export const Charts = memo(ChartsComponent)
