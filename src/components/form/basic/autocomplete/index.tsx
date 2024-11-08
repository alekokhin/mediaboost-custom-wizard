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
    label?: string
    options: OptionType[]
  }

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps<any>>(
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
