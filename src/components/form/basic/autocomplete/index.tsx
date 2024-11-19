import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { forwardRef } from 'react'

import { TextField } from '../text-field'

export type OptionType = {
  label: string
  [key: string]: any
}

export type AutocompleteProps<T> = Omit<FormControlProps, 'children'> &
  Omit<MuiAutocompleteProps<T, false, false, false>, 'renderInput'> & {
    /**
     * The label for the autocomplete input.
     * @type {string}
     */
    label?: string

    /**
     * The array of options to display in the dropdown.
     * Each option must have a `label` property.
     * Additional properties can be added to the option objects as needed.
     * @type {T[]}
     */
    options: T[]
  }
/**
 * `Autocomplete` is a reusable component that combines Material-UI's `Autocomplete`
 * with a custom `FormControl` and `TextField` for a consistent design and functionality.
 * It provides a convenient way to implement dropdowns with auto-suggestion capabilities.
 *
 * @template T - The type of the options array.
 *
 * @param {AutocompleteProps<T>} props - The props for the `Autocomplete` component.
 *
 * @returns {JSX.Element} - A rendered `Autocomplete` component.
 *
 */

export const Autocomplete = forwardRef<
  HTMLDivElement,
  AutocompleteProps<OptionType>
>(
  (
    { options, error, label, helperText, required, sx, htmlFor, ...otherProps },
    ref,
  ) => {
    return (
      <FormControl
        htmlFor={htmlFor}
        error={error}
        fullWidth={otherProps.fullWidth}
        helperText={helperText}
        disabled={otherProps.disabled}
      >
        <MuiAutocomplete
          ref={ref}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              error={error}
              required={required}
            />
          )}
          {...otherProps}
          options={options}
        />
      </FormControl>
    )
  },
)
