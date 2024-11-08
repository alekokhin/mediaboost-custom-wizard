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
    onChange?: (value: any) => void
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

  return (
    <Autocomplete
      {...field}
      options={options}
      fullWidth={fullWidth}
      onChange={(_, newValue) => {
        field.onChange(newValue.label)
        onChange?.(newValue)
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
