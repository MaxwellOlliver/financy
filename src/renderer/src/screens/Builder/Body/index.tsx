import { Charts } from './Charts'
import { Form } from './Form'
import { ItemsTable } from './ItemsTable'

export function Body() {
  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-4 md:grid-cols-1">
      <div className="w-full md:hidden lg:block">
        <Charts />
      </div>
      <div className="w-full flex flex-col gap-4">
        <Form />
        <ItemsTable />
      </div>
    </div>
  )
}
