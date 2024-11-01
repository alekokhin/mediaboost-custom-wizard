import {
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnRounded,
} from '@mui/icons-material'
import { Box, Divider, Stack, Typography } from '@mui/material'

const ReviewStep = () => {
  // const { getValues } = useFormContext<TYPES.PropertyFormData>()
  // const values = getValues()

  return (
    <Stack spacing={3} sx={{ overflow: 'auto' }}>
      <Box>
        <Typography fontWeight="500" fontSize="14px">
          Please review the details before submitting
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Box
          height="200px"
          sx={{ backgroundColor: 'red', borderRadius: '10px', padding: '10px' }}
        >
          <Typography variant="h1"></Typography>
        </Box>

        <Box
          maxHeight="50px"
          sx={{
            overflow: 'auto',
            scrollbarWidth: 'none', // For Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Edge
          }}
        >
          <Typography variant="caption" fontSize="10px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis necessitatibus, quae debitis dignissimos, nam sapiente
            et cumque deleniti possimus iure amet saepe nobis consequuntur
            obcaecati eaque natus tempore tempora dolore.
          </Typography>
        </Box>
      </Stack>
      <Stack>
        <Box display="flex">
          <Typography fontWeight="700" fontSize="24px">
            300$ /
          </Typography>
          <Typography fontWeight="400" fontSize="24px">
            monthly
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="5px">
          <LocationOnRounded
            sx={{ color: 'rgba(125, 121, 121, 1)', width: '15px' }}
          />
          <Typography fontWeight="400" fontSize="12px">
            Input your concluding description here.
          </Typography>
        </Box>
      </Stack>
      <Typography fontWeight="400" fontSize="12px">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
        reiciendis nemo delectus perspiciatis voluptas quas quibusdam magnam
        ipsam sequi eligendi architecto deserunt dolorem explicabo modi earum
        quos. Repellendus, maiores quo!
      </Typography>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box
          sx={{
            border: '1px solid black',
            borderRadius: '50px',
            width: '100px',
            height: '20px',
          }}
        ></Box>
        <Box
          sx={{
            border: '1px solid black',
            borderRadius: '50px',
            width: '100px',
            height: '20px',
          }}
        ></Box>
        <Box
          sx={{
            border: '1px solid black',
            borderRadius: '50px',
            width: '100px',
            height: '20px',
          }}
        ></Box>
        <Box
          sx={{
            border: '1px solid black',
            borderRadius: '50px',
            width: '100px',
            height: '20px',
          }}
        ></Box>
      </Box>
      <Divider sx={{ borderWidth: '5px' }} />
      <Stack spacing={2}>
        <Typography fontWeight="700" fontSize="16px">
          Contact Info
        </Typography>
        <Box display="flex" alignItems="center" gap="5px">
          <LocalPhoneOutlined sx={{ width: '25px' }} />
          <Typography fontWeight="400" fontSize="16px">
            7487356
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="5px">
          <EmailOutlined sx={{ width: '25px' }} />
          <Typography fontWeight="400" fontSize="16px">
            ugazsdg@jhas.jks
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ReviewStep
