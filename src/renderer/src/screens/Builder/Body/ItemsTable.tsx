import { Table } from '@renderer/components/Table'
import { categories } from '@renderer/constants/category'
import { FinancyItem } from '@renderer/types/financy'
import { formatCurrency } from '@renderer/utils'
import { createColumnHelper } from '@tanstack/react-table'

export function ItemsTable() {
  const columnHelper = createColumnHelper<FinancyItem>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Nome'
    }),
    columnHelper.accessor('value', {
      header: 'Valor',
      cell: ({ row }) => <span>{formatCurrency(row.original.value, 'BRL', true)}</span>
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
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

  return (
    <Table
      columns={columns}
      data={[
        {
          name: 'Item 1',
          value: 10,
          category: categories[2].value
        },
        {
          name: 'Item 2',
          value: 20,
          category: categories[5].value
        }
      ]}
    />
  )
}
