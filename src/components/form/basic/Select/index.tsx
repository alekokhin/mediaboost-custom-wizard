import { ArrowDropDown } from '@mui/icons-material'
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  useTheme,
} from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { Dispatch, SetStateAction } from 'react'

export type SelectOption = {
  label: string
  value: any
}

export type SelectProps<T extends string> = Omit<FormControlProps, 'children'> &
  Omit<MuiSelectProps, 'value' | 'onChange' | 'label'> & {
    /**
     * The selected value(s) of the select component.
     * Can be a single value or an array of values when `multiple` is true.
     * @type {T | Array<T>}
     */
    value?: T | Array<T>

    /**
     * An array of options to display in the dropdown.
     * Each option is an object with a `label` and `value`.
     * @type {Array<SelectOption>}
     */
    options: Array<SelectOption>

    /**
     * A function that handles changes to the selected value.
     * @param {T | Array<T>} value - The newly selected value(s).
     */
    onChange?: Dispatch<SetStateAction<T | Array<T>>>
  }
/**
 * `Select` is a custom dropdown component that wraps Material-UI's `Select` component.
 * It supports both single and multiple selection modes, custom placeholder, and "Select All" functionality.
 *
 * @template T - The type of the value being selected, typically a `string`.
 *
 * @param {SelectProps<T>} props - The props for the `Select` component.
 *
 * @returns {JSX.Element} - A rendered `Select` component.
 *
 *
 */

export const Select = <T extends string>({
  placeholder,
  value,
  options,
  onChange,
  label,
  error,
  helperText,
  required,
  multiple,
  disabled,
  fullWidth,
  ...otherProps
}: SelectProps<T>) => {
  const theme = useTheme()

  const isAllSelected = Array.isArray(value) && value.length === options.length

  return (
    <FormControl
      fullWidth={fullWidth}
      htmlFor={label}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
    >
      <MuiSelect
        {...otherProps}
        value={value}
        variant="standard"
        onChange={event => {
          const newValue = event.target.value
          if (Array.isArray(newValue) && newValue.includes('ALL')) {
            onChange?.(isAllSelected ? [] : options.map(option => option.value))
          } else {
            onChange?.(newValue as T | Array<T>)
          }
        }}
        multiple={multiple}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        error={error}
        // eslint-disable-next-line sonarjs/no-unstable-nested-components
        IconComponent={props => (
          <ArrowDropDown
            {...props}
            sx={{
              ml: '5px',
              '&.MuiSelect-icon': {
                color: '#DBDEE3',
                '&.Mui-disabled': {
                  color: theme.palette.text.disabled,
                },
              },
            }}
          />
        )}
        sx={{
          height: '40px',
          '& .MuiInputBase-input': {
            color: value === '' ? 'text.secondary' : undefined,
          },
        }}
        renderValue={selected => {
          const renderLabel = (item: T) =>
            options.find(option => option.value === item)?.label

          if (selected === '') {
            return placeholder
          }

          if (multiple) {
            if (isAllSelected) {
              return 'All'
            }
            return (selected as Array<T>).map(renderLabel).join(', ')
          }
          return renderLabel(selected as T)
        }}
        disabled={disabled}
      >
        {multiple && (
          <MenuItem value="ALL" divider>
            <Checkbox checked={isAllSelected} />
            <ListItemText primary="All" sx={{ pl: 1 }} />
          </MenuItem>
        )}
        {options.map(({ label, value: optionValue }) => {
          const isChecked = Array.isArray(value) && value.includes(optionValue)

          return (
            <MenuItem
              key={optionValue}
              value={optionValue}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              {multiple && <Checkbox checked={isChecked} />}
              <ListItemText primary={label} sx={{ pl: multiple ? 1 : 0 }} />
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}
