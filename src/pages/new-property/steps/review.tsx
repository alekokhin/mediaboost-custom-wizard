// steps/review.tsx
import { Box, Paper, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const ReviewStep = () => {
  const { getValues } = useFormContext<TYPES.PropertyFormData>()
  const values = getValues()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Property Address</Typography>
        <Typography>{values.address.country}</Typography>
        {/* <Typography>{`${values.address.city}, ${values.address.street} ${values.address.zipCode}`}</Typography> */}
      </Paper>

      <Paper sx={{ p: 2 }}>
        {/* <Typography variant="h6">Property Details</Typography>
        <Typography>{`Bedrooms: ${values.details.bedrooms}`}</Typography>
        <Typography>{`Bathrooms: ${values.details.bathrooms}`}</Typography>
        <Typography>{`Type: ${values.details.rooms}`}</Typography>
        <Typography>{`Area: ${values.details.size} sq ft`}</Typography>
        <Typography>{`Price: $${values.details.price}`}</Typography>
        <Typography>{`Price: $${values.details.currency}`}</Typography>
        <Typography>{`Price: $${values.details.period}`}</Typography> */}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Description</Typography>
        {/* <Typography>{values.description.description}</Typography>
        <Typography>{values.description.phone}</Typography>
        <Typography>{values.description.email}</Typography> */}
      </Paper>
    </Box>
  )
}

export default ReviewStep
