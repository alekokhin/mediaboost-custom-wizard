import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { forwardRef } from 'react'

export type TextAreaProps = Omit<FormControlProps, 'children'> &
  MuiTextFieldProps & {
    /**
     * Disables browser auto-fill if set to true.
     * @type {boolean}
     */
    disableAutofill?: boolean
  }
/**
 * `TextArea` is a customizable wrapper around Material-UI's `TextField` component.
 * It provides additional support for form controls, validation, and optional auto-fill disabling.
 *
 * This component is suitable for rendering multi-line text inputs with optional character limits.
 *
 * @param {TextAreaProps} props - The properties for configuring the TextArea component.
 *
 * @returns {JSX.Element} - A rendered `TextArea` component.
 *
 */

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      htmlFor,
      label,
      error,
      helperText,
      required,
      disableAutofill,
      ...textFieldProps
    },
    ref,
  ) => {
    return (
      <FormControl
        htmlFor={htmlFor}
        error={error}
        fullWidth={textFieldProps.fullWidth}
        helperText={helperText}
        required={required}
        disabled={textFieldProps.disabled}
      >
        <MuiTextField
          label={label}
          ref={ref}
          {...textFieldProps}
          error={error}
          type={textFieldProps.type}
          inputProps={{ maxLength: 150_000 }}
          {...(disableAutofill
            ? {
                inputProps: textFieldProps.inputProps,
              }
            : undefined)}
        />
      </FormControl>
    )
  },
)
