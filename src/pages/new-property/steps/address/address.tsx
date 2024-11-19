import { Box, Grid2 } from '@mui/material'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'
import { ControlledAutocomplete } from 'components/form/controlled/controlled-autocomplete'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { getCountryOptions } from '.'

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
  const { data } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  })
  const countryOptions = useMemo(() => getCountryOptions(data || []), [data])

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
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <ControlledAutocomplete
            options={countryOptions}
            control={control}
            name="address.country"
            label="country"
            fullWidth
            getOptionLabel={option => option.label}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <Box
                    component="img"
                    loading="lazy"
                    width="20px"
                    src={option.flag}
                    alt=""
                  />
                  {option.label}
                </Box>
              )
            }}
          />
        </Grid2>

        <Grid2 size={6}>
          <ControlledTextField
            control={control}
            name="address.city"
            fullWidth
            label="city"
          />
        </Grid2>
        <Grid2 size={6}>
          <ControlledTextField
            control={control}
            name="address.zipCode"
            fullWidth
            label="zip/postal"
            type="number"
          />
        </Grid2>
        <Grid2 size={6}>
          <ControlledTextField
            control={control}
            fullWidth
            name="address.street"
            label="street address"
          />
        </Grid2>
        <Grid2 size={3}>
          <ControlledTextField
            control={control}
            name="address.apartmentNum"
            fullWidth
            label="apartment number"
            type="number"
          />
        </Grid2>
        <Grid2 size={3}>
          <ControlledTextField
            control={control}
            name="address.floor"
            fullWidth
            label="floor"
            type="number"
          />
        </Grid2>
      </Grid2>
      <Box sx={{ height: '50%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={3}
        >
          <Marker position={center} />
        </GoogleMap>
      </Box>
    </Box>
  )
}
export default AddressStep
