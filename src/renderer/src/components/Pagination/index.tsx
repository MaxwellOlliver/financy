import { cn } from '@renderer/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled
}) => {
  const [maxPagesToShow, setMaxPagesToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMaxPagesToShow(1)
      } else {
        setMaxPagesToShow(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [totalPages])

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const halfPagesToShow = Math.floor(maxPagesToShow / 2)

    let startPage = Math.max(currentPage - halfPagesToShow, 1)
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxPagesToShow + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift('...')
      }
      pages.unshift(1)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPages()

  return (
    <nav>
      <ul className="pagination flex items-center gap-2">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link p-2 rounded-md text-primary hover:bg-primary-100 disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
          >
            <ChevronLeft className="size-5" />
          </button>
        </li>
        {pages.map((page, index) => (
          <li
            key={index}
            className={cn(
              'p-2 rounded-md text-sm min-w-10 flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200',
              page === currentPage && 'bg-primary text-white hover:bg-primary-600',
              page === '...' && 'pointer-events-none bg-white p-1 min-w-0',
              disabled && 'pointer-events-none bg-gray-100 text-gray-500'
            )}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link p-2 rounded-md text-primary hover:bg-primary-100 transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
          >
            <ChevronRight className="size-5" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
