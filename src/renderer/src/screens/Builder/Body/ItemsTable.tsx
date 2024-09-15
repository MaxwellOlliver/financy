import { Table } from '@renderer/components/Table'
import { categories } from '@renderer/constants/category'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { PurchaseData } from '@renderer/types/financy'
import { formatCurrency } from '@renderer/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export function ItemsTable() {
  const id = useParams<{ id: string }>().id
  const getPurchases = useFileBuilderStore((s) => s.getPurchases)

  const [purchases, setPurchases] = useState<PurchaseData[]>(() => getPurchases(id!) ?? [])

  useEffect(() => {
    const addPurchaseListener = ({ projectId, purchase }) => {
      if (projectId === id) {
        setPurchases((prev) => [...prev, purchase])
      }
    }

    const searchItemsListener = ({ search }) => {
      console.log('chamou', search)
      if (!id) return

      if (search === '') {
        setPurchases(getPurchases(id))
      } else {
        setPurchases((prev) =>
          prev.filter((purchase) =>
            purchase.purchaseName.toLowerCase().includes(search.toLowerCase())
          )
        )
      }
    }
    fileBuilderEventBus.on('add-purchase', addPurchaseListener)
    fileBuilderEventBus.on('search', searchItemsListener)

    return () => {
      fileBuilderEventBus.off('add-purchase', addPurchaseListener)
      fileBuilderEventBus.off('search', searchItemsListener)
    }
  }, [id])

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<PurchaseData>()

    return [
      columnHelper.accessor('purchaseName', {
        header: 'nome'
      }),
      columnHelper.accessor('value', {
        header: 'valor',
        cell: ({ row }) => <span>{formatCurrency(row.original.value, 'BRL', true)}</span>
      }),
      columnHelper.accessor('category', {
        header: 'categoria',
        cell: ({ row }) => {
          const category = categories.find((category) => category.value === row.original.category)

          const Icon = category?.icon

          return (
            <div className="flex items-center gap-2">
              {Icon && <Icon className="size-4" style={{ color: category.color }} />}
              <span>{category?.name}</span>
            </div>
          )
        }
      })
    ]
  }, [])

  return <Table columns={columns} data={purchases} />
}
