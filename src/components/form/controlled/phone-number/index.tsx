import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { isRequired } from 'components/form/validations'
import { FieldPath, FieldValues, useController } from 'react-hook-form'
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone'

import { ControlledTextFieldProps } from '../controlled-text-field'

export const MuiPhone = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  required,
  rules,
  helperText,
  placeholder,
  defaultCountry,
  ...otherProps
}: ControlledTextFieldProps<TFieldValues, TName> & {
  defaultCountry: string
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  const { country, handlePhoneValueChange, setCountry } = usePhoneInput({
    defaultCountry,
    value: field.value?.number || '', // Ensure we use the phone number as a string
    countries: defaultCountries,
    onChange: data => {
      const phoneData = { country: country.iso2, number: data.phone || '' }
      field.onChange(phoneData) // Update field value with the object format
    },
  })

  return (
    <TextField
      size="small"
      required={required}
      placeholder={placeholder}
      type="tel"
      ref={field.ref}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      onChange={handlePhoneValueChange}
      value={field.value?.number || ''} // Ensure number part is used as string
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: '2px', marginLeft: '-8px' }}
          >
            <Select
              MenuProps={{
                PaperProps: {
                  style: {
                    border: 'none', // Remove border from the dropdown
                  },
                },
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                  border: 'none',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={e => setCountry(e.target.value as CountryIso2)}
              renderValue={value => (
                <FlagImage iso2={value} style={{ display: 'flex' }} />
              )}
            >
              {defaultCountries.map(c => {
                const country = parseCountry(c)
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: '8px' }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                )
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...otherProps}
    />
  )
}
