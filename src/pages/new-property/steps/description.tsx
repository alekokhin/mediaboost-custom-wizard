import 'react-international-phone/style.css'

import { Box, Stack, Typography } from '@mui/material'
import { ControlledTextArea } from 'components/form/controlled/controlled-text-area'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { MuiPhone } from 'components/form/controlled/phone-number'
import { email } from 'components/form/validations'
import { useFormContext } from 'react-hook-form'

const DescriptionStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()

  return (
    <Stack spacing={2}>
      <Typography fontWeight="700" fontSize="16px">
        Input your concluding description here.
      </Typography>
      <ControlledTextArea
        placeholder="Final description..."
        control={control}
        multiline
        name="description.description"
        rows={8}
        slotProps={{
          input: { sx: { borderRadius: '10px' } },
        }}
      />
      <Typography fontWeight="700" fontSize="16px">
        Contact Info
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography fontWeight="700" fontSize="16px">
            Phone Number
          </Typography>
          <MuiPhone
            control={control}
            fullWidth
            required
            name="description.phone"
            defaultCountry="ge"
          />
        </Box>
        <Box>
          <Typography fontWeight="700" fontSize="16px">
            Contact Info
          </Typography>
          <ControlledTextField
            control={control}
            name="description.email"
            rules={email}
            placeholder="example@gmail.com"
            fullWidth
          />
        </Box>
      </Stack>
    </Stack>
  )
}

export default DescriptionStep
