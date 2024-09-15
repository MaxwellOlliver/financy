import { FormHeader } from './FormHeader'
import { ViewToggle } from './ViewToggle'

export function Header() {
  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-4 md:grid-cols-1">
      <div className="w-full">
        <ViewToggle />
      </div>
      <div className="w-full">
        <FormHeader />
      </div>
    </div>
  )
}
