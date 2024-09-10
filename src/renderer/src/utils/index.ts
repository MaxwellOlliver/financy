import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringifyOrderBy(orderBy?: { column?: string; order?: 'asc' | 'desc' }) {
  if (!orderBy || !orderBy.column || !orderBy.order) {
    return ''
  }

  return `${orderBy.column}-${orderBy.order}`
}
