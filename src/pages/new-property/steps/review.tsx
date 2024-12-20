/* eslint-disable sonarjs/no-clear-text-protocols */
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import {
  CheckCircleOutline,
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnRounded,
} from '@mui/icons-material'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import Bath from 'assets/icons/bath.png'
import Bedroom from 'assets/icons/bedroom.png'
import Rooms from 'assets/icons/rooms.png'
import Size from 'assets/icons/size.png'
import PlaceOfferCard from 'components/basics/place-offer-card'
import { TYPES } from 'constants/types'
import { Controller, useFormContext } from 'react-hook-form'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuid } from 'uuid'

const ReviewStep = () => {
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext<TYPES.PropertyFormData>()

  const values = getValues()
  // const [selectedId, setSelectedId] = useState<number>()

  // const handleSelect = (id: number) => {
  //   setSelectedId(id)
  // }

  // const { data } = useQuery({
  //   queryKey: ['templates'],
  //   queryFn: getTemplates,
  // })
  const layouts = [
    {
      id: '14',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/14/DEFAULT.jpg',
    },
    {
      id: '13',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/13/DEFAULT.jpg',
    },
    {
      id: '12',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/12/DEFAULT.jpg',
    },
    {
      id: '11',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/11/DEFAULT.jpg',
    },
    {
      id: '9',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/9/DEFAULT.jpg',
    },
    {
      id: '8',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/8/DEFAULT.jpg',
    },
    {
      id: '7',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/7/DEFAULT.jpg',
    },
    {
      id: '6',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/6/DEFAULT.jpg',
    },
    {
      id: '5',
      previewUrl: 'http://spw.propertyminder.com/toolkit/layout/5/DEFAULT.jpg',
    },
  ]
  const vibrationProps = useSpring({
    to: errors.designId
      ? [
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(0px)' },
        ]
      : { transform: 'translateX(0px)' },
    config: { duration: 50 },
  })
  return (
    <Stack height="100%">
      <Box
        sx={{
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
            modules={[FreeMode, Pagination]}
            className="mySwiper"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {values.images.map(image => (
              <SwiperSlide key={uuid()}>
                <Stack spacing={2} width="100%" sx={{ margin: '0 0 25px 0' }}>
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
                    <Typography fontSize="15px" textAlign="center">
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
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxHeight: '250px',
              overflow: 'auto',
              gap: '10px',
              padding: '10px 0',
            }}
          >
            {values.details.placeOffers.map(placeOffer => (
              <PlaceOfferCard
                key={placeOffer.key}
                label={placeOffer.label}
                icon={placeOffer.icon}
              />
            ))}
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
      <Box
        sx={{
          width: '100%', // Smaller width for the slider
          margin: '10px auto', // Center the slider horizontally
          zIndex: 10, // Ensure it stays above other elements
        }}
      >
        <animated.div style={vibrationProps} className="space-y-4">
          <Controller
            name="designId"
            control={control}
            rules={{
              required: 'Please select a template',
            }}
            render={({ field: { value, onChange } }) => (
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                className="template-swiper"
              >
                {layouts.map(layout => (
                  <SwiperSlide
                    key={layout.id}
                    style={{
                      borderRadius: '5px',
                      padding: '5px',
                      cursor: 'pointer',
                      width: '40%',
                    }}
                    onClick={() => {
                      onChange(layout.id)
                    }}
                  >
                    <Box
                      component="img"
                      src={layout.previewUrl}
                      alt={`Layout ${layout.id}`}
                      sx={{
                        borderRadius: '5px',
                      }}
                    />

                    <CheckCircleOutline
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '20px',
                        color: '#fff',
                        borderRadius: '100%',
                        backgroundColor:
                          layout.id === value ? '#6CBB3B' : '#57534E',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          />
        </animated.div>
      </Box>
    </Stack>
  )
}

export default ReviewStep
