import { LucideIcon } from 'lucide-react'

export type DropdownItem = {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  disabled?: boolean
  hidden?: boolean
}
