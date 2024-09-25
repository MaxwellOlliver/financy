import { Table } from '@renderer/components/Table'
import { categories } from '@renderer/constants/category'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { PurchaseData } from '@renderer/types/financy'
import { formatCurrency } from '@renderer/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

type Filter = {
  category?: string
  minValue?: number
  maxValue?: number
}

export function ItemsTable() {
  const id = useParams<{ id: string }>().id
  const getPurchases = useFileBuilderStore((s) => s.getPurchases)

  const [purchases, setPurchases] = useState<PurchaseData[]>(() => getPurchases(id!) ?? [])
  const [filter, setFilter] = useState<Filter>({})

  const hasFilter =
    Object.keys(filter).length > 0 || filter.category || !!filter.minValue || !!filter.maxValue

  const updatePurchases = () => {
    const purchases = getPurchases(id!)

    if (!hasFilter) {
      setPurchases(purchases)
      return
    }

    setPurchases(
      purchases.filter((purchase) => {
        if (filter.category && purchase.category !== filter.category) return false
        if (!!filter.minValue && purchase.value < filter.minValue) return false
        if (!!filter.maxValue && purchase.value > filter.maxValue) return false

        return true
      })
    )
  }

  useEffect(() => {
    if (!id) return

    setPurchases(getPurchases(id))
  }, [id])

  useEffect(() => {
    if (!id) return

    updatePurchases()
  }, [filter])

  useEffect(() => {
    const addPurchaseListener = ({ projectId }) => {
      if (projectId === id) {
        updatePurchases()
      }
    }

    const searchItemsListener = ({ search }) => {
      if (!id) return

      if (search === '') {
        setPurchases(getPurchases(id))
      } else {
        const newValue = purchases.filter(
          (purchase) =>
            purchase.purchaseName.toLowerCase().includes(search.toLowerCase()) ||
            purchase.category.toLowerCase().includes(search.toLowerCase()) ||
            purchase.value.toString().includes(search.toLowerCase())
        )
        setPurchases(newValue)
      }
    }

    const filterItemsListener = (filter) => {
      if (!id) return

      setFilter(filter)
    }

    fileBuilderEventBus.on('add-purchase', addPurchaseListener)
    fileBuilderEventBus.on('search', searchItemsListener)
    fileBuilderEventBus.on('filter', filterItemsListener)

    return () => {
      fileBuilderEventBus.off('add-purchase', addPurchaseListener)
      fileBuilderEventBus.off('search', searchItemsListener)
      fileBuilderEventBus.off('filter', filterItemsListener)
    }
  }, [id, filter])

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
