import { Navbar } from '@renderer/components/Navbar'
import { Sidebar } from '@renderer/components/Sidebar'
import { Outlet } from 'react-router-dom'

export function Dashboard() {
  return (
    <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr] h-full w-full">
      <Sidebar />
      <div className="h-full w-full">
        <div className="grid grid-rows-[40px_1fr]">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
