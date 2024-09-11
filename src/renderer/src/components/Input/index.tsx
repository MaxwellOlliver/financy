import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { forwardRef, useEffect, useId, useState } from 'react'
import { FormField } from '../FormField'
import { mask } from 'remask'
import { Control, Controller } from 'react-hook-form'
import { inputClassNames } from './styles'
import { cn } from '@renderer/utils'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'ref'> {
  label?: string
  error?: string
  containerClassName?: string
  datalistData?: string[]
  maskPatterns?: string[]
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  control?: Control<any, any>
  required?: boolean
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    datalistData,
    iconLeft: IconLeft,
    iconRight: IconRight,
    className,
    maskPatterns,
    error,
    label,
    required,
    containerClassName,
    ...props
  },
  ref
) {
  const { control, input: inputStyles } = inputClassNames({
    error: !!error,
    disabled: !!props.disabled
  })
  const [internalValue, setInternalValue] = useState(() => props.value ?? props.defaultValue ?? '')

  const [type, setType] = useState(props.type ?? 'text')
  const initialType = props.type ?? 'text'

  const id = props.id ?? useId()

  useEffect(() => {
    if (props.value !== undefined)
      setInternalValue(maskPatterns ? mask(String(props.value ?? ''), maskPatterns) : props.value)
  }, [props.value, maskPatterns])

  const handleTogglePassword = () => {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    if (maskPatterns) {
      newValue = mask(newValue, maskPatterns)
    }

    setInternalValue(newValue)

    if (props.onChange) {
      e.target.value = newValue
      props.onChange(e)
    }
  }

  return (
    <FormField label={label} error={error} id={id} className={className} required={required}>
      <div className={cn(control, containerClassName)}>
        {IconLeft && (
          <div className="flex items-center">
            <IconLeft className="w-4 h-4 mr-2" />
          </div>
        )}
        <div className="flex items-center relative w-full">
          <input
            ref={ref}
            {...props}
            className={inputStyles}
            id={id}
            list={props.list ?? `${id}-list`}
            type={type}
            value={internalValue}
            onChange={handleChange}
          />
          {type === 'password' && (
            <EyeOff
              className="absolute right-0 size-4 cursor-pointer"
              onClick={handleTogglePassword}
            />
          )}
          {type === 'text' && initialType === 'password' && (
            <Eye
              className="absolute right-0 size-4 cursor-pointer"
              onClick={handleTogglePassword}
            />
          )}
        </div>
        {IconRight && (
          <div className="flex items-center">
            <IconRight className="w-4 h-4 ml-2" />
          </div>
        )}
        {datalistData && (
          <datalist id={props.list ?? `${id}-list`} className="ml-2">
            {datalistData?.map((option) => <option key={option} value={option} />)}
          </datalist>
        )}
      </div>
    </FormField>
  )
})

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { control, ...props }: InputProps,
  ref
) {
  return control && props.name ? (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => <InputComponent {...field} {...props} />}
    />
  ) : (
    <InputComponent {...props} ref={ref} />
  )
})
