import { Button } from '@renderer/components/Button'
import { CurrencyInput } from '@renderer/components/CurrencyInput'
import { Input } from '@renderer/components/Input'
import { Select } from '@renderer/components/Select'
import { categories } from '@renderer/constants/category'
import { fileBuilderEventBus } from '@renderer/helpers/events'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { Option } from '@renderer/types/select'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRoute } from '@renderer/lib/Router'

type FinancyItemData = {
  purchaseName: string
  value: number
  category: Option | null
}

const schema = yup.object().shape({
  purchaseName: yup.string().required('Nome é obrigatório'),
  value: yup.number().required('Valor é obrigatório').min(1, 'Valor deve ser maior que R$ 0,00'),
  category: yup.object().required('Categoria é obrigatória')
}) as yup.ObjectSchema<FinancyItemData>

export function Form() {
  const projectId = useRoute<{ id: string }>().params.id
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FinancyItemData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      purchaseName: '',
      category: null,
      value: undefined
    },
    resolver: yupResolver(schema)
  })

  const addPurchase = useFileBuilderStore((s) => s.addPurchase)

  const handleAddPurchase = ({ category, purchaseName, value }: FinancyItemData) => {
    if (!projectId) return

    addPurchase(projectId, {
      category: category?.value ?? '',
      purchaseName: purchaseName,
      value: value
    })
    fileBuilderEventBus.emit('add-purchase', projectId)
    reset({
      purchaseName: '',
      category: null,
      value: undefined
    })
  }

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.value
  }))

  return (
    <form
      onSubmit={handleSubmit(handleAddPurchase)}
      className="bg-custombg-600 w-full flex gap-2 p-2 rounded-md items-start"
    >
      <Input
        placeholder="Local"
        label="nome da compra"
        control={control}
        name="purchaseName"
        error={errors.purchaseName?.message}
      />
      <CurrencyInput control={control} name="value" label="valor" error={errors.value?.message} />
      <Select
        label="categoria"
        placeholder="Categoria"
        options={categoryOptions}
        control={control}
        name="category"
        error={errors.category?.message}
      />
      <Button size="md" className="py-3.5 mt-6" type="submit">
        <Plus className="size-4" />
      </Button>
    </form>
  )
}
