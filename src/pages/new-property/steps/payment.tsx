// steps/payment.tsx
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, Divider, Stack, Tooltip, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getPlans } from 'api/plans'
import planCheckIcon from 'assets/icons/plan-check.png'
import { TYPES } from 'constants/types'
import { Controller, useFormContext } from 'react-hook-form'

const PaymentStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()
  const { data } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  })
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2,
        overflow: 'auto',
        height: '100%',
      }}
    >
      <Typography
        sx={{
          background: 'linear-gradient(90deg, #3D348B 50%, #7678ED 95.49%)',
          WebkitBackgroundClip: 'text', // Enables text gradient
          WebkitTextFillColor: 'transparent', // Makes the gradient visible
          fontWeight: 'bold', // Optional for styling
          fontSize: { xs: '20px', sm: '30px' },
        }}
      >
        Pick the price thats right for you
      </Typography>
      <Controller
        name="plan"
        control={control}
        rules={{
          required: 'Please select a template',
        }}
        render={({ field: { onChange } }) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {(data || []).map(plan => (
              <Box
                key={plan.serviceType}
                sx={{
                  width: '100%',
                  height: '350px',
                  boxShadow:
                    ' 0px 4px 6px -2px #3D348B08, inset 2px 0px 15px -2px #3D348B08',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Stack width="80%" spacing={2}>
                  <Typography
                    sx={{
                      fontSize: '44px',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {plan.planName}
                  </Typography>
                  <Divider />
                  <Box display="flex" alignItems="center" gap="20px">
                    <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
                      ${plan.priceUsd}
                    </Typography>
                    <Typography>/{plan.plan}</Typography>
                  </Box>
                  <Box className="plan-secondary-text">
                    <Box component="img" src={planCheckIcon} />
                    <Typography>{plan.impressions} guaranteed views</Typography>
                  </Box>
                  <Box className="plan-secondary-text">
                    <Box className="plan-secondary-text">
                      <Box component="img" src={planCheckIcon} />
                      <Typography>CPM</Typography>
                    </Box>
                    <Tooltip title="hint1" enterTouchDelay={0}>
                      <InfoOutlined
                        sx={{ marginLeft: 'auto', color: '#5445CE' }}
                      />
                    </Tooltip>
                  </Box>
                  <Box className="plan-secondary-text">
                    <Box className="plan-secondary-text">
                      <Box component="img" src={planCheckIcon} />
                      <Typography>Cancel anytime</Typography>
                    </Box>
                    <Tooltip title="hint2" enterTouchDelay={0}>
                      <InfoOutlined
                        sx={{ marginLeft: 'auto', color: '#5445CE' }}
                      />
                    </Tooltip>
                  </Box>
                  <Button
                    key={plan.name}
                    sx={{
                      height: '45px',
                      borderRadius: '5px',
                      padding: '5px',
                      backgroundColor: '#5445CE',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                    type="submit"
                    onClick={() => onChange(plan.serviceType)}
                  >
                    Create Ad
                  </Button>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      />
    </Box>
  )
}

export default PaymentStep
