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
    /**
     * Disables browser autofill behavior when set to `true`.
     * @type {boolean}
     */
    disableAutofill?: boolean

    /**
     * Callback fired when the selected value changes.
     * The new value is provided as an `OptionType` or `null`.
     * @param {OptionType | null} value - The new selected value.
     */
    onChange?: (value: OptionType | null) => void
  }
/**
 * `ControlledAutocomplete` is a form-controlled version of the `Autocomplete` component,
 * designed to work seamlessly with `react-hook-form`. It integrates with form validation
 * and management, providing a convenient way to use auto-suggestion dropdowns within forms.
 *
 * @template TFieldValues - The shape of your form values.
 * @template TName - The specific field name within your form values.
 *
 * @param {ControlledAutocompleteProps<TFieldValues, TName>} props - The props for the `ControlledAutocomplete` component.
 *
 * @returns {JSX.Element} - A rendered `ControlledAutocomplete` component.
 *
 *
 */

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
