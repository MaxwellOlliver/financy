import { useCallback } from 'react'
import { Input } from '../Input'
import { debounce } from 'lodash'

interface DebouncedInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export const DebouncedInput = ({ onChange, ...props }: DebouncedInputProps) => {
  const onChangeDebounced = useCallback(debounce(onChange, 300), [])

  return <Input {...props} onChange={(e) => onChangeDebounced(e)} />
}
