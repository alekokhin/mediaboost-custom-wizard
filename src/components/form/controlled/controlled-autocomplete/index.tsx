import {
  Autocomplete,
  AutocompleteProps,
  OptionType,
} from 'components/form/basic/autocomplete'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<AutocompleteProps<OptionType>, 'onChange' | 'value' | 'ref'> &
  UseControllerProps<TFieldValues, TName> & {
    disableAutofill?: boolean
    onChange?: (value: OptionType | null) => void
  }

export const ControlledAutocomplete = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  helperText,
  fullWidth,
  disableAutofill,
  onChange,
  onFocus,
  options,
  ...otherProps
}: ControlledAutocompleteProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  // Find the matching option based on the field value
  const fieldValue = field.value
    ? options.find((opt: OptionType) => {
        if (typeof field.value === 'string') {
          return opt.label === field.value
        }
        return opt.label === (field.value as OptionType)?.label
      }) || null
    : null

  return (
    <Autocomplete
      {...field}
      value={fieldValue}
      options={options}
      fullWidth={fullWidth}
      onChange={(_, newValue: OptionType | null) => {
        field.onChange(newValue?.label || '')
        onChange?.(newValue)
      }}
      getOptionLabel={(option: OptionType) => option.label}
      isOptionEqualToValue={(option: OptionType, value: OptionType | null) => {
        if (!value) return false
        return option.label === value.label
      }}
      ref={field.ref as React.Ref<HTMLDivElement>}
      onFocus={onFocus}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      label={label}
      disabled={disabled}
      required={required}
      {...otherProps}
    />
  )
}
