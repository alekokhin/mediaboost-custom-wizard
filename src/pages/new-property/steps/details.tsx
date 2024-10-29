import { Box, Divider, Stack, Typography } from '@mui/material'
import { ControlledSelect } from 'components/form/controlled/controlled-select'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Counter from 'components/form/controlled/counter'
import { useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

const DetailsStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()

  // Define the details array with proper typing
  const details: Array<{
    label: string
    name: keyof TYPES.PropertyFormData['details']
  }> = [
    { label: 'Size', name: 'size' },
    { label: 'Rooms', name: 'rooms' },
    { label: 'Bedrooms', name: 'bedrooms' },
    { label: 'Bathrooms', name: 'bathrooms' },
  ]
  const currencyOptions = [
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'GEL',
      value: 'GEL',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ]
  const periodOptions = [
    {
      label: 'Month',
      value: 'Month',
    },
    {
      label: 'Week',
      value: 'Week',
    },
    {
      label: 'Day',
      value: 'Day',
    },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <Stack spacing={7}>
        <Typography fontWeight="400" fontSize="14px" lineHeight="17.5px">
          Additional Property-Specific Information
        </Typography>
        <Stack spacing={7}>
          <Stack spacing={3}>
            {details.map((detail, index) => (
              <Box key={uuid()}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>{detail.label}:</Typography>
                  <Counter
                    control={control}
                    name={detail.name as keyof TYPES.PropertyFormData}
                  />
                </Box>
                {index !== details.length - 1 && <Divider />}
              </Box>
            ))}
          </Stack>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50%', display: 'flex', gap: '10px' }}>
                <Box sx={{ width: '60%' }}>
                  <ControlledTextField
                    fullWidth
                    slotProps={{
                      input: {
                        inputProps: { min: 0 },
                        sx: {
                          height: '40px',
                          fontSize: '36px',
                          fontWeight: 700,
                        },
                      },
                    }}
                    control={control}
                    type="number"
                    name="details.price"
                    variant="standard"
                  />
                </Box>
                <ControlledSelect
                  variant="standard"
                  value={'USD'}
                  control={control}
                  name="details.currency"
                  options={currencyOptions}
                />
              </Box>
              <Box
                sx={{
                  width: '45%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <ControlledSelect
                  variant="standard"
                  value={'Month'}
                  control={control}
                  name="details.period"
                  options={periodOptions}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default DetailsStep
