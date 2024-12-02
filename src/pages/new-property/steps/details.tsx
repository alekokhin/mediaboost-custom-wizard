import {
  AcUnitOutlined,
  FireExtinguisher,
  FireplaceOutlined,
  FitnessCenterOutlined,
  KitchenOutlined,
  LocalHospitalOutlined,
  LocalLaundryServiceOutlined,
  LocalParkingOutlined,
  MedicalServicesOutlined,
  ParkOutlined,
  PoolOutlined,
  WifiOutlined,
} from '@mui/icons-material'
import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import PlaceOfferCard from 'components/basics/place-offer-card'
import { ControlledSelect } from 'components/form/controlled/controlled-select'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { number } from 'components/form/validations'
import { TYPES } from 'constants/types'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

const placeOffers = [
  {
    label: 'Parking',
    icon: <LocalParkingOutlined />,
    key: 'parking',
  },

  {
    label: 'Wifi',
    icon: <WifiOutlined />,
    key: 'wifi',
  },

  {
    label: 'Washer',
    icon: <LocalLaundryServiceOutlined />,
    key: 'washer',
  },
  {
    label: 'Fitness',
    icon: <FitnessCenterOutlined />,
    key: 'fitness',
  },

  {
    label: 'AC',
    icon: <AcUnitOutlined />,
    key: 'ac',
  },

  {
    label: 'Kitchen',
    icon: <KitchenOutlined />,
    key: 'kitchen',
  },

  {
    label: 'Park',
    icon: <ParkOutlined />,
    key: 'park',
  },

  {
    label: 'Pool',
    icon: <PoolOutlined />,
    key: 'pool',
  },

  {
    label: 'Fire extinguisher',
    icon: <FireExtinguisher />,
    key: 'fireExtinguisher',
  },

  {
    label: 'Fire pit',
    icon: <FireplaceOutlined />,
    key: 'firePit',
  },
  {
    label: 'First aid kit',
    icon: <MedicalServicesOutlined />,
    key: 'firstAidKit',
  },
  {
    label: 'Local hospital',
    icon: <LocalHospitalOutlined />,
    key: 'localHospital',
  },
]

const DetailsStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details.placeOffers',
  })
  const handleChange = (placeOffer: TYPES.PlaceOffer) => {
    const existingIndex = fields.findIndex(item => item.key === placeOffer.key)

    if (existingIndex === -1) {
      append(placeOffer)
    } else {
      remove(existingIndex)
    }
  }

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2,
        height: '100%',
      }}
    >
      <Stack height="100%">
        <Typography fontWeight="400" fontSize="14px" lineHeight="17.5px">
          Additional Property-Specific Information
        </Typography>
        <Stack justifyContent="space-between" height="100%" margin="50px 0">
          <Grid2 container spacing={2}>
            {details.map(detail => {
              return (
                <Grid2 size={6} key={uuid()}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>{detail.label}:</Typography>
                    <ControlledTextField
                      control={control}
                      type="number"
                      rules={number}
                      placeholder="0"
                      required
                      slotProps={{ input: { sx: { border: 0 } } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                        '& .MuiInputBase-input': {
                          textAlign: 'right', // Horizontal alignment
                        },
                      }}
                      name={
                        ('details.' +
                          detail.name) as keyof TYPES.PropertyFormData
                      }
                    />
                  </Box>
                  <Divider />
                </Grid2>
              )
            })}
          </Grid2>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxHeight: '250px',
              height: '200px',
              overflow: 'auto',
              gap: '10px',
              padding: '10px',
            }}
          >
            {placeOffers.map(placeOffer => (
              <PlaceOfferCard
                key={placeOffer.key}
                label={placeOffer.label}
                icon={placeOffer.icon}
                select={fields.some(item => item.key === placeOffer.key)}
                onClick={() => handleChange(placeOffer)}
              />
            ))}
          </Box>
          <Box>
            <Typography
              fontWeight="400"
              fontSize="14px"
              lineHeight="17.5px"
              marginBottom="10px"
            >
              Set Your Rental Price:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50%', display: 'flex', gap: '10px' }}>
                <ControlledSelect
                  variant="standard"
                  defaultValue={'USD'}
                  control={control}
                  name="details.currency"
                  options={currencyOptions}
                />
                <Box sx={{ width: '60%' }}>
                  <ControlledTextField
                    fullWidth
                    required
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
              </Box>
              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">In</Typography>
                <ControlledSelect
                  variant="standard"
                  defaultValue={'Month'}
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
