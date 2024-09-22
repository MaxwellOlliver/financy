import { Button } from '@renderer/components/Button'
import { CurrencyInput } from '@renderer/components/CurrencyInput'
import { Select } from '@renderer/components/Select'
import { categories } from '@renderer/constants/category'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { Option } from '@renderer/types/select'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormData = {
  minValue: number
  maxValue: number
  category: Option | null
}

interface FilterFormProps {
  onToggle: () => void
}

const schema = yup.object().shape({
  minValue: yup
    .number()
    .when(['maxValue'], ([maxValue], schema) =>
      maxValue ? schema.max(maxValue, 'Valor mínimo deve ser menor que o valor máximo') : schema
    ),
  maxValue: yup.number(),
  category: yup.object().nullable()
}) as yup.ObjectSchema<FormData>

export function FilterForm({ onToggle }: FilterFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleApplyFilter = ({ category, maxValue, minValue }: FormData) => {
    const filter = {
      category: category?.value,
      maxValue: maxValue,
      minValue: minValue
    }

    const dirtyFilter = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key]) {
        acc[key] = filter[key]
      }
      return acc
    }, {})

    fileBuilderEventBus.emit('filter', dirtyFilter)
    onToggle()
  }

  const handleResetFilters = () => {
    reset({
      category: null,
      maxValue: 0,
      minValue: 0
    })
    fileBuilderEventBus.emit('filter', {})
    onToggle()
  }

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.value
  }))

  return (
    <form
      onSubmit={handleSubmit(handleApplyFilter)}
      className="bg-custombg-600 w-72 flex flex-col gap-2 p-2 rounded-md items-center"
    >
      <CurrencyInput
        control={control}
        name="minValue"
        label="Valor mínimo"
        error={errors.minValue?.message}
      />
      <CurrencyInput
        control={control}
        name="maxValue"
        label="Valor máximo"
        error={errors.maxValue?.message}
      />
      <Select
        label="categoria"
        placeholder="Categoria"
        options={categoryOptions}
        control={control}
        name="category"
        error={errors.category?.message}
        isClearable
      />
      <Button type="submit" color="secondary" className="w-full mt-4">
        Aplicar
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={handleResetFilters}>
        Limpar
      </Button>
    </form>
  )
}
