// steps/details.tsx
import { Box } from '@mui/material'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { useFormContext } from 'react-hook-form'

const DetailsStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <ControlledTextField control={control} name="address.country" />
    </Box>
  )
}

export default DetailsStep
