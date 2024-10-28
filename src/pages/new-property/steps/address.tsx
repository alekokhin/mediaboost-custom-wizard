import { Box } from '@mui/material'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { useFormContext } from 'react-hook-form'

const AddressStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <ControlledTextField
        control={control}
        name="address.country"
        label="country"
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}
      >
        <ControlledTextField
          control={control}
          name="address.city"
          fullWidth
          label="city"
        />
        <ControlledTextField
          control={control}
          name="address.zipCode"
          fullWidth
          label="zip/postal"
        />
      </Box>
      <ControlledTextField
        control={control}
        name="address.street"
        label="street address"
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}
      >
        <ControlledTextField
          control={control}
          name="address.apartmentNum"
          fullWidth
          label="apartment number"
        />
        <ControlledTextField
          control={control}
          name="address.floor"
          fullWidth
          label="floor"
        />
      </Box>
    </Box>
  )
}
export default AddressStep
