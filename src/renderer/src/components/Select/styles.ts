import { cn } from '@renderer/utils'
import { ClassNamesConfig, GroupBase, Props } from 'react-select'

export const selectClassNames: (props: {
  error: boolean
}) => ClassNamesConfig<unknown, boolean, GroupBase<unknown>> = ({ error }) => ({
  control: (props) =>
    cn(
      'bg-custombg-500 px-3 py-3 rounded-md text-sm w-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
      props.isDisabled && 'pointer-events-none bg-gray-100',
      error &&
        !props.isDisabled &&
        'border-error hover:border-error focus-within:ring-error focus-within:border-error focus-within:hover:border-error'
    ),
  clearIndicator: () => 'text-gray-400',
  dropdownIndicator: () => 'text-gray-400',
  option: ({ isFocused, isSelected }) =>
    cn(
      'cursor-pointer p-3 transition-colors duration-200',
      isFocused && 'bg-custombg-400',
      isSelected && 'bg-primary-600 text-white'
    ),
  noOptionsMessage: () => 'text-custombg-200 mx-2 my-3 font-normal',
  menu: () => 'bg-custombg-500 mt-1 shadow-md z-10 overflow-hidden text-sm rounded-md',
  groupHeading: () => 'text-sm text-gray-500 font-medium px-2 py-1 font-normal',
  group: () => 'py-1 last:rounded-b-md',
  placeholder: () => 'text-custombg-300',
  multiValue: () => 'bg-primary-100 rounded-md px-1',
  multiValueRemove: () => 'cursor-pointer ml-1',
  valueContainer: () => 'gap-1',
  loadingIndicator: () => 'text-primary',
  menuList: () =>
    'scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-200 bg-transparent border-none',
  loadingMessage: () => 'py-2'
})

export const selectStyles: Props['styles'] = {
  input: (base) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none'
    }
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: 'thin'
  })
}
