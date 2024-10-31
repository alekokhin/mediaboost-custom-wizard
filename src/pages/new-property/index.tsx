import { Check, Circle } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
} from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import AddressStep from './steps/address'
import DescriptionStep from './steps/description'
import DetailsStep from './steps/details'
import ImagesStep from './steps/images'
import PaymentStep from './steps/payment'
import ReviewStep from './steps/review'

const CustomStepIcon: React.FC<StepIconProps> = ({ active, completed }) => {
  if (completed) {
    return <Check style={{ color: '#6a0dad' }} />
  }
  return (
    <Circle
      style={{
        color: active ? '' : '#b0b0b0',
      }}
    />
  )
}
const getStep = (step: number) => {
  switch (step) {
    case 3: {
      return <AddressStep />
    }
    case 1: {
      return <DetailsStep />
    }
    case 2: {
      return <ImagesStep />
    }
    case 0: {
      return <DescriptionStep />
    }
    case 4: {
      return <ReviewStep />
    }
    case 5: {
      return <PaymentStep />
    }
  }
}

const NewProperty = () => {
  const steps = [
    'Property address',
    'Property details',
    'Property images',
    'Additional description',
    'Final review',
    'Payment',
  ]
  const [activeStep, setActiveStep] = useState(0)

  const methods = useForm<TYPES.PropertyFormData>({})

  // eslint-disable-next-line no-console
  console.log(methods.getValues())

  const onSubmit = (data: TYPES.PropertyFormData) => {
    if (activeStep === steps.length - 1) {
      // eslint-disable-next-line no-console
      console.log('Final form data:', data)
      // Handle form submission
      return
    }
    handleNext()
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const progress = (activeStep / (steps.length - 1)) * 100

  return (
    <FormProvider {...methods}>
      <Container sx={{ padding: '0' }} maxWidth="sm">
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack
            sx={{
              padding: '16px 0px 10px 0px',
              height: '95dvh',
            }}
          >
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={CustomStepIcon} />
                </Step>
              ))}
            </Stepper>
            <Container
              sx={{ height: '85%', padding: '16px', overflow: 'auto' }}
            >
              {getStep(activeStep)}
            </Container>
            <Stack>
              <Box sx={{ my: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  )
}

export default NewProperty
