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
    value?: T | Array<T>
    options: Array<SelectOption>
    onChange?: Dispatch<SetStateAction<T | Array<T>>>
  }

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
