import { sidebarItems } from '@renderer/layout/config/sidebar'
import { LogoText } from '../LogoText'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { cn } from '@renderer/utils'

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const activeSidebarItem = useMemo(() => {
    return sidebarItems.find((item) => item.path === location.pathname)
  }, [location.pathname])

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div className="flex flex-col items-center h-full py-4 w-full">
      <LogoText className="mb-6" />
      <div className="w-full flex flex-col gap-2 px-4">
        {sidebarItems.map((item) => {
          return (
            <div
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                'flex p-3 w-full rounded-md items-center gap-2 py-2 px-4 cursor-pointer',
                'hover:bg-custombg-600 transition-colors duration-200',
                activeSidebarItem?.path === item.path &&
                  'text-primary cursor-default bg-[#EB5E2820] hover:bg-[#EB5E2820]'
              )}
            >
              <item.icon className="size-4" />
              <span className="text-base">{item.title}</span>
            </div>
          )
        })}
      </div>
      <div className="w-full flex justify-center opacity-50 mt-auto">
        <span className="text-secondary font-thin text-sm">v1.0.0</span>
      </div>
    </div>
  )
}
