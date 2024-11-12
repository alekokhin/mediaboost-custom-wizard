import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Box, IconButton } from '@mui/material'
import { TextField } from 'components/form/basic/text-field'
import { isRequired } from 'components/form/validations'
import { FieldPath, FieldValues, useController } from 'react-hook-form'

import { ControlledTextFieldProps } from '../controlled-text-field'

/**
 * `Counter` is a controlled component that combines a text field with increment and decrement buttons.
 * It is built using Material-UI components and is designed to work seamlessly with `react-hook-form` for form control.
 * This component is typically used for numeric input fields where users can either type a value or adjust it using buttons.
 *
 * @template TFieldValues - The shape of form values, extending from `FieldValues`.
 * @template TName - The specific field path within `TFieldValues`.
 *
 * @param {ControlledTextFieldProps<TFieldValues, TName>} props - The properties for configuring the Counter component.
 *
 * @returns {JSX.Element} - A rendered `Counter` component.
 *
 */

const Counter = <
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
  placeholder,
  InputProps,
  disableAutofill,
  readonly,
  onChange,
  onFocus,
}: ControlledTextFieldProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  const handleIncrement = () => {
    field.onChange(Number(field.value || 0) + 1) // Update field value directly
  }

  const handleDecrement = () => {
    field.onChange(Math.max(0, Number(field.value || 0) - 1)) // Ensure value doesn't go below 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event) // Invoke original onChange
    if (onChange) {
      onChange(event.target.value) // Invoke provided onChange
    }
  }

  return (
    <Box display="flex" alignItems="center" maxWidth="100px">
      <IconButton onClick={handleDecrement} aria-label="decrease" size="small">
        <RemoveCircleOutlineIcon fontSize="small" />
      </IconButton>
      <TextField
        ref={field.ref}
        value={field.value}
        onChange={handleChange}
        onFocus={onFocus}
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message || helperText}
        label={label}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        slotProps={{
          input: {
            ...InputProps,
            sx: {
              height: '56px',
              border: 'none',
              textAlign: 'center',
            },
            readOnly: readonly,
            disableUnderline: true,
          },
        }}
        sx={{
          textAlign: 'center',
          '& .MuiInputBase-input': {
            textAlign: 'center', // Horizontal alignment
            padding: '10px 0', // Adjust padding for vertical alignment
          },
        }}
        variant="standard"
        type="number"
        disableAutofill={disableAutofill}
      />
      <IconButton onClick={handleIncrement} aria-label="increase" size="small">
        <AddCircleOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default Counter
