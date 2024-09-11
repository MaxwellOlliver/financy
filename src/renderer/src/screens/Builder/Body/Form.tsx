import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Select } from '@renderer/components/Select'
import { categories } from '@renderer/constants/category'
import { Plus } from 'lucide-react'

export function Form() {
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.value
  }))

  return (
    <div className="bg-custombg-600 w-full flex gap-2 p-2 rounded-md items-center">
      <Input placeholder="Local" />
      <Input placeholder="Valor" />
      <Select placeholder="Categoria" options={categoryOptions} />
      <Button size="md" className="py-3.5">
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
