import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { unMask } from 'remask'
import { inputClassNames } from '../Input/styles'
import { formatCurrency } from '@renderer/utils'
import { FormField } from '../FormField'

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'placeholder'> {
  currency?: 'USD' | 'BRL' | 'EUR'
  label?: string
  error?: string
  control?: Control<any, any>
  onChange?: (value: string) => void
}

const CurrencyInputComponent = forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput({ currency, required, error, label, ...props }: CurrencyInputProps, ref) {
    const { control, input: inputStyles } = inputClassNames({
      error: !!error,
      disabled: !!props.disabled
    })

    const [amount, setAmount] = useState(formatCurrency('0', currency ?? 'BRL'))

    useEffect(() => {
      if (props.value !== undefined)
        setAmount(formatCurrency(String(props.value ?? ''), currency ?? 'BRL'))
    }, [props.value])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (/[a-z]/i.test(value)) return

      const numericValue = value.replace(/[^0-9]/g, '')

      const formatted = formatCurrency(numericValue, currency ?? 'BRL')

      if (value === '') {
        const zero = formatCurrency('0', currency ?? 'BRL')
        setAmount(formatCurrency(zero))
        props.onChange?.(unMask(zero))
        return
      }

      setAmount(formatted)
      props.onChange?.(unMask(numericValue))
    }

    const currencySymbol = {
      BRL: 'R$',
      USD: '$',
      EUR: '€'
    }

    return (
      <FormField label={label} error={error} required={required}>
        <div className={control}>
          <div className="flex items-center text-gray-400 text-sm mr-1">
            <span>{currencySymbol[currency ?? 'BRL']}</span>
          </div>
          <input
            {...props}
            value={amount}
            onChange={handleChange}
            className={inputStyles}
            ref={ref}
          />
        </div>
      </FormField>
    )
  }
)

export const CurrencyInput = ({ control, ...props }: CurrencyInputProps) => {
  return control && props.name ? (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => <CurrencyInputComponent {...field} {...props} />}
    />
  ) : (
    <CurrencyInputComponent {...props} />
  )
}
