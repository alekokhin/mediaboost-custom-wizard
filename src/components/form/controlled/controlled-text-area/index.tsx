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
    /**
     * Disables browser autofill behavior when set to `true`.
     * @type {boolean}
     */
    disableAutofill?: boolean

    /**
     * If `true`, displays a character counter below the text area.
     * @type {boolean}
     */
    counter?: boolean

    /**
     * Maximum number of characters allowed in the text area.
     * When set, the component enforces this limit without showing an error.
     * @type {number}
     */
    maxLength?: number
  }
/**
 * `ControlledTextArea` is a form-controlled version of the `TextArea` component,
 * designed to work seamlessly with `react-hook-form`. It provides additional features
 * such as character counting and max length enforcement without displaying validation errors.
 *
 * @template TFieldValues - The shape of your form values.
 * @template TName - The specific field name within your form values.
 *
 * @param {ControlledTextAreaProps<TFieldValues, TName>} props - The props for the `ControlledTextArea` component.
 *
 * @returns {JSX.Element} - A rendered `ControlledTextArea` component.
 *
 */

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
        error={Boolean(fieldState.error)}
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
