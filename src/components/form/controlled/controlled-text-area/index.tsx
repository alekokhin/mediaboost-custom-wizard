import { Box, Typography } from '@mui/material'
import { TextArea, TextAreaProps } from 'components/form/basic/text-area'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledTextAreaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TextAreaProps &
  UseControllerProps<TFieldValues, TName> & {
    disableAutofill?: boolean
    counter?: boolean
    maxLength?: number
  }

export const ControlledTextArea = <
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
  placeholder,
  InputProps,
  type,
  disableAutofill,
  variant,
  minRows,
  rows,
  multiline,
  fullWidth,
  counter = false,
  maxLength,
  onFocus,
  ...otherProps
}: ControlledTextAreaProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  // Handler to enforce maxLength without showing an error
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!maxLength || event.target.value.length <= maxLength) {
      field.onChange(event)
    }
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <TextArea
        {...otherProps}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        variant={variant}
        ref={field.ref}
        value={field.value}
        onChange={handleChange} // Updated to use handleChange
        onFocus={onFocus}
        helperText={fieldState.error?.message || helperText}
        label={label}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        InputProps={InputProps}
        type={type}
        disableAutofill={disableAutofill}
        inputProps={{ maxLength }}
      />
      {(counter || maxLength) && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ position: 'absolute', bottom: 5, right: 8 }}
        >
          {(field.value ?? '').length}
          {maxLength ? `/${maxLength}` : ''}
        </Typography>
      )}
    </Box>
  )
}
