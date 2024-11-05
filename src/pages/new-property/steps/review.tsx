import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import {
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnRounded,
} from '@mui/icons-material'
import { Box, Divider, Stack, Typography } from '@mui/material'
import Bath from 'assets/icons/bath.png'
import Bedroom from 'assets/icons/bedroom.png'
import Rooms from 'assets/icons/rooms.png'
import Size from 'assets/icons/size.png'
import { useFormContext } from 'react-hook-form'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuid } from 'uuid'

const ReviewStep = () => {
  const { getValues } = useFormContext<TYPES.PropertyFormData>()
  const values = getValues()

  return (
    <Box
      sx={{
        maxHeight: '100%',
        overflow: 'auto',
        scrollbarWidth: 'none', // For Firefox
        '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Edge
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography fontWeight="500" fontSize="14px">
            Please review the details before submitting
          </Typography>
        </Box>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          zoom={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {values.images.map(image => (
            <SwiperSlide key={uuid()}>
              <Stack spacing={2} width="100%">
                <Box
                  component="img"
                  src={URL.createObjectURL(image.image)}
                  sx={{
                    borderRadius: '10px',
                  }}
                />

                <Box
                  maxHeight="50px"
                  sx={{
                    overflow: 'auto',
                    scrollbarWidth: 'none', // For Firefox
                    '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Edge
                  }}
                >
                  <Typography fontSize="10px" textAlign="center">
                    {image.description}
                  </Typography>
                </Box>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
        <Stack>
          <Box display="flex">
            <Typography fontWeight="700" fontSize="24px">
              {values.details.price} {values.details.currency} /
            </Typography>
            <Typography fontWeight="400" fontSize="24px">
              {values.details.period}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="5px">
            <LocationOnRounded
              sx={{ color: 'rgba(125, 121, 121, 1)', width: '15px' }}
            />
            <Typography fontWeight="400" fontSize="12px">
              {values.address?.country},{values.address?.city},
              {values.address?.zipCode},{values.address?.street},
              {values.address?.apartmentNum},{values.address?.floor}
            </Typography>
          </Box>
        </Stack>
        <Typography
          fontWeight="400"
          fontSize="12px"
          maxHeight="150px"
          overflow="auto"
        >
          {values.description.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            maxWidth: '100%',
            overflowX: 'auto',
            scrollbarWidth: 'none', // For Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Edge
          }}
        >
          <Box
            sx={{
              border: '1px solid black',
              borderRadius: '50px',
              padding: '0 6px',
              gap: '3px',
              height: '20px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box component="img" width="15px" height="15px" src={Bedroom} />
            <Typography fontWeight="400" fontSize="12px">
              {values.details.bedrooms}
            </Typography>
            <Typography fontWeight="400" fontSize="12px">
              bedrooms
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              borderRadius: '50px',
              padding: '0 10px',
              gap: '5px',
              height: '20px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box component="img" width="15px" height="15px" src={Rooms} />
            <Typography fontWeight="400" fontSize="12px">
              {values.details.rooms}
            </Typography>
            <Typography fontWeight="400" fontSize="12px">
              rooms
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              borderRadius: '50px',
              padding: '0 10px',
              gap: '5px',
              height: '20px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box component="img" width="15px" height="15px" src={Bath} />
            <Typography fontWeight="400" fontSize="12px">
              {values.details.bathrooms}
            </Typography>
            <Typography fontWeight="400" fontSize="12px">
              bath
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid black',
              borderRadius: '50px',
              padding: '0 10px',
              gap: '5px',
              height: '20px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box component="img" width="15px" height="15px" src={Size} />
            <Typography fontWeight="400" fontSize="12px">
              {values.details.size}
            </Typography>
            <Typography fontWeight="400" fontSize="12px">
              m
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderWidth: '5px' }} />
        <Stack spacing={2}>
          <Typography fontWeight="700" fontSize="16px">
            Contact Info
          </Typography>
          <Box display="flex" alignItems="center" gap="5px">
            <LocalPhoneOutlined sx={{ width: '25px' }} />
            <Typography fontWeight="400" fontSize="16px">
              {values.description?.phone.number}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="5px">
            <EmailOutlined sx={{ width: '25px' }} />
            <Typography fontWeight="400" fontSize="16px">
              {values.description?.email}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ReviewStep
