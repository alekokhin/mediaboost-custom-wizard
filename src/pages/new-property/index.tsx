/* eslint-disable no-console */
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
import { animated, useTransition } from '@react-spring/web'
import { useMutation } from '@tanstack/react-query'
import { sendWizard } from 'api/wizard'
import Loader from 'components/loader'
import { TYPES } from 'constants/types'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import AddressStep from './steps/address/address'
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
    case 0: {
      return <DescriptionStep />
    }
    case 1: {
      return <DetailsStep />
    }
    case 2: {
      return <AddressStep />
    }
    case 3: {
      return <ImagesStep />
    }
    case 4: {
      return <ReviewStep />
    }
    case 5: {
      return <PaymentStep />
    }
    default: {
      return null
    }
  }
}

const getFormData = (data: TYPES.PropertyFormData) => {
  const formData = new FormData()
  const { images, plan, ...dataWithoutImages } = data

  // Append the main data object

  // Append image descriptions as a JSON string
  const imageDescriptions = images.map((image, index) => ({
    imageIndex: index,
    description: image.description,
  }))
  formData.append(
    'data',
    JSON.stringify({ ...dataWithoutImages, imageDescriptions }),
  )
  formData.append('plan', plan)

  for (const image of images) {
    formData.append('images ', image.image)
  }
  // Use JSON.stringify to convert the array to a string

  return formData // Return the FormData object
}

const NewProperty = () => {
  const steps = [
    'Property address',
    'Property details',
    'Additional description',
    'Property images',
    'Final review',
    'payment',
  ]
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  // ===============animations================================
  const transitions = useTransition(activeStep, {
    from: {
      opacity: 0,
      transform:
        direction === 'forward' ? 'translateX(100%)' : 'translateX(-100%)',
    },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: {
      opacity: 0,
      transform:
        direction === 'forward' ? 'translateX(-100%)' : 'translateX(100%)',
    },
    config: { duration: 250 },
  })
  // ===============animations================================
  // Set up the mutation with the correct type for FormData
  const $sendWizard = useMutation({
    mutationFn: sendWizard,
  })
  const methods = useForm<TYPES.PropertyFormData>({
    defaultValues: {
      details: { period: 'Month', currency: 'USD' },
    },
  })
  console.log($sendWizard.isPending)
  const onSubmit = (data: TYPES.PropertyFormData) => {
    if (activeStep === steps.length - 1) {
      const body = getFormData(data)
      $sendWizard.mutate(body, {
        onSuccess: data => {
          window.location.href = data
          console.log('Data submitted successfully:', data)
        },
        onError: error => {
          console.error('Error submitting data:', error)
        },
      })
      return
    }
    handleNext()
  }

  const handleNext = () => {
    setDirection('forward')
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setDirection('backward')
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  console.log(methods.getValues())

  const progress = (activeStep / (steps.length - 1)) * 100

  return (
    <FormProvider {...methods}>
      <Container sx={{ padding: '0' }} maxWidth="sm">
        {$sendWizard.isPending && <Loader />}
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack sx={{ padding: '16px 0px 10px 0px', height: '95dvh' }}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={CustomStepIcon} />
                </Step>
              ))}
            </Stepper>

            <Container sx={{ height: '85%', padding: '16px' }}>
              {transitions((style, stepIndex) =>
                stepIndex === activeStep ? (
                  <animated.div
                    style={{ ...style, width: '100%', height: '100%' }}
                  >
                    {getStep(stepIndex)}
                  </animated.div>
                ) : null,
              )}
            </Container>
            <Stack>
              <Box sx={{ my: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    display: activeStep === steps.length - 1 ? 'none' : 'block',
                  }}
                >
                  Next
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
