import { Button } from '@renderer/components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal } from '@renderer/components/Modal'
import { Pen, Save, X } from 'lucide-react'
import { useFileBuilderStore } from '@renderer/store/fileBuilderStore'
import { useFileBuilderNavigationStore } from '@renderer/store/fileBuilderNavigationStore'
import { useParams } from 'react-router-dom'
import { Input } from '@renderer/components/Input'
import { fileBuilderEventBus } from '@renderer/helpers/events'

type FormData = {
  name: string
}

interface UpdateProjectNameModalProps {
  isOpen: boolean
  onClose: () => void
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório')
}) as yup.ObjectSchema<FormData>

export function UpdateProjectNameModal(props: UpdateProjectNameModalProps) {
  return (
    <Modal {...props} title="Atualizar nome" icon={Pen}>
      <Component {...props} />
    </Modal>
  )
}

function Component({ onClose }: UpdateProjectNameModalProps) {
  const id = useParams<{ id: string }>().id
  const updateProjectName = useFileBuilderStore((state) => state.updateProjectName)
  const getFile = useFileBuilderStore((state) => state.getFile)
  const updateTabName = useFileBuilderNavigationStore((state) => state.updateTabName)

  const currentFile = getFile(id!)

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentFile?.project.name
    }
  })

  const isDirty = Object.keys(dirtyFields).length > 0

  const handleApplyFilter = ({ name }: FormData) => {
    if (!id) return

    updateProjectName(id, name)
    updateTabName(id, name)
    fileBuilderEventBus.emit('save-file', { id })
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(handleApplyFilter)}
      className="bg-custombg-600 flex flex-col gap-2 rounded-md items-center"
    >
      <Input
        control={control}
        name="name"
        label="Nome do projeto"
        placeholder={currentFile?.project.name}
        error={errors.name?.message}
      />
      <div className="flex gap-4 mt-8 w-full">
        <Button type="submit" color="primary" size="sm" disabled={!isDirty} iconLeft={Save}>
          Salvar
        </Button>
        <Button type="button" color="secondary" size="sm" iconLeft={X} onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
