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

export function formatCurrency(
  value: string | number,
  currency: 'USD' | 'BRL' | 'EUR' = 'BRL',
  currencySign = false
) {
  if (typeof value === 'number') {
    value = (value as number).toFixed(2)
  }

  if (value === '') {
    return value
  }

  const cleanValue = value.replace(/\D/g, '')
  const numberValue = parseInt(cleanValue, 10)

  if (currency === 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
      style: currencySign ? 'currency' : 'decimal',
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(numberValue / 100)
  }

  if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: currencySign ? 'currency' : 'decimal',
      currency: 'EUR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(numberValue / 100)
  }

  return new Intl.NumberFormat('en-US', {
    style: currencySign ? 'currency' : 'decimal',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(numberValue / 100) // Convert to dollars
}
