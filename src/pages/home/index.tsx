import { AddHomeRounded } from '@mui/icons-material'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import MainImage from 'assets/images/main_image.png'
import Logo from 'assets/images/SPW4U.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Container
      sx={{
        height: '98dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={8} alignItems="center">
        <Box component="img" src={Logo} />
        <Stack spacing={2}>
          <Typography
            textAlign="center"
            fontWeight="700"
            fontSize="22px"
            lineHeight="21px"
            sx={{ color: 'rgba(25, 52, 69, 1)' }}
          >
            Say Goodbye to Rental Stress
          </Typography>
          <Typography
            textAlign="center"
            fontWeight="700"
            fontSize="22px"
            lineHeight="21px"
            sx={{ color: 'rgba(25, 52, 69, 1)' }}
          >
            Your Real Estate Journey Starts Here
          </Typography>
        </Stack>
        <Box component="img" src={MainImage} />
        <IconButton
          onClick={() => navigate('new-property')}
          sx={{
            backgroundColor: 'rgba(81, 121, 146, 1)',
            borderRadius: '14px',
            width: '265px',
            color: 'rgba(255, 255, 255, 1)',
            '&:hover': {
              backgroundColor: 'rgb(70 105 128)',
            },
          }}
        >
          <AddHomeRounded
            sx={{ mr: '5px', aspectRatio: '1', width: '37px', height: 'auto' }}
          />
          <Typography fontWeight="700" fontSize="18px" lineHeight="21px">
            SPW4U setup
          </Typography>
        </IconButton>
      </Stack>
    </Container>
  )
}

export default Home
