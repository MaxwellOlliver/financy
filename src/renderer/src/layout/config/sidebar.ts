import { FileSpreadsheet, Home, LucideIcon } from 'lucide-react'

export type SidebarItem = {
  title: string
  icon: LucideIcon
  path: string
}

export const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    title: 'Início',
    path: '/home'
  },
  {
    icon: FileSpreadsheet,
    title: 'Meus financies',
    path: '/home/financies'
  }
]
