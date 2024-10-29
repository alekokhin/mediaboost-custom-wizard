import { Box, Stack } from '@mui/material'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { useFormContext } from 'react-hook-form'

const AddressStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    maxHeight: '250px',
  }

  const center = {
    lat: 41.730_61, // Set this to the latitude you want
    lng: 41.935_242, // Set this to the longitude you want
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2,
        position: 'relative',
        height: '100%',
        justifyContent: 'space-evenly',
      }}
    >
      <Stack spacing={2}>
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
            type="number"
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
            type="number"
          />
          <ControlledTextField
            control={control}
            name="address.floor"
            fullWidth
            label="floor"
            type="number"
          />
        </Box>
      </Stack>
      <Box sx={{ height: '50%' }}>
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Box>
    </Box>
  )
}
export default AddressStep
