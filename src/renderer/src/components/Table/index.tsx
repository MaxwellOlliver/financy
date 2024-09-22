import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  TableOptions,
  useReactTable
} from '@tanstack/react-table'
import { Pagination } from '../Pagination'
import { cn } from '@renderer/utils'

interface TableProps {
  columns: TableOptions<any>['columns']
  data: any[]
}

export function Table({ columns, data }: TableProps) {
  const table = useReactTable({
    columns,
    data: data ?? [],
    rowCount: data?.length ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    enableRowSelection: true,
    enableMultiSort: false
  })

  return (
    <div className="table-container flex flex-col">
      <div className={cn('flex', 'w-full', 'my-4', 'mb-8', 'overflow-x-auto', 'thin-scrollbar')}>
        <table className={cn('border-collapse', 'table-fixed', 'w-full', 'max-w-full')}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={cn(
                      'px-8',
                      'py-3',
                      'text-sm',
                      header.id !== 'actions' && 'min-w-36',
                      'font-normal',
                      'text-nowrap',
                      'text-secondary',
                      header.column.getCanSort() && 'cursor-pointer'
                    )}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width: header.id === 'actions' ? '100px' : 'auto'
                    }}
                  >
                    <div className={cn('w-full flex justify-start gap-2 items-center')}>
                      <span
                        className="text-left"
                        style={{
                          width: header.id === 'actions' ? '100%' : 'auto'
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                      {header.column.getCanSort() && header.column.getIsSorted() && (
                        <button className="outline-offset-2 outline-primary">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronDown className={cn('size-4', 'inline')} />
                          ) : (
                            <ChevronUp className={cn('size-4', 'inline')} />
                          )}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr className="border-b border-gray-200 last:border-none">
                <td
                  colSpan={table.getVisibleFlatColumns().length}
                  className="px-4 py-6 text-center text-custombg-400 text-sm"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr className="animate-fade-in" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className={cn('border-b-[0.875rem] border-transparent', 'p-0', 'group')}
                      key={cell.id}
                    >
                      <div
                        className={cn(
                          'w-full',
                          'px-8',
                          'py-6',
                          'bg-custombg-600',
                          'text-sm',
                          'group-first:rounded-s-md',
                          'group-last:rounded-e-md'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(Math.ceil(table.getRowCount() / table.getState().pagination.pageSize) || 1) > 1 && (
        <footer className="flex items-center justify-between gap-4 flex-wrap max-md:flex-col max-md:items-start">
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            totalPages={Math.ceil(table.getRowCount() / table.getState().pagination.pageSize) || 1}
            disabled={table.getRowCount() <= 9}
          />
        </footer>
      )}
    </div>
  )
}
