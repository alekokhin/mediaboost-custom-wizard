/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/sonar-no-unused-vars */
/* eslint-disable sonarjs/no-dead-store */
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { Box, Button, Stack, Typography } from '@mui/material'
import addImage from 'assets/icons/addImage.png'
import { TextField } from 'components/form/basic/text-field'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuid } from 'uuid'

const ImagesStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'images',
  })

  const handleImageUpload = (event: any) => {
    const file = event.target.files
    if (file) {
      for (const image of file) {
        append({ image: image, description: '' })
      }
    }
  }
  const maxWords = 150
  const [description, setDescription] = useState('')

  const handleDescriptionBlur =
    (index: number) => (event: React.FocusEvent<HTMLInputElement>) => {
      const text = event.target.value
      // eslint-disable-next-line no-console
      console.log(text)

      if (text.length <= maxWords) {
        update(index, { ...fields[index], description })
      }
    }
  const handleDescriptionChange = (event: any) => {
    const text = event.target.value
    if (text.length <= maxWords) {
      setDescription(text)
    }
  }

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box width="100%">
        <Typography textAlign="left" fontWeight="700" fontSize="20px">
          Upload images
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
        {fields.map((field, index) => (
          <SwiperSlide key={uuid()}>
            <Box height="100%" width="100%">
              <Stack
                width="100%"
                height="80%"
                justifyContent="space-between"
                spacing={3}
              >
                <Box
                  component="img"
                  src={field.image}
                  alt="Uploaded"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '65%',
                    borderRadius: '10px',
                  }}
                />
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <TextField
                    placeholder="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    onBlur={handleDescriptionBlur(index)}
                    slotProps={{
                      input: { sx: { borderRadius: '10px', height: '100%' } },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ position: 'absolute', bottom: 5, right: 8 }}
                  >
                    {field.description.length}/{maxWords}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Box height="100%" width="99%">
            <Box
              sx={{
                height: '80%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                fontSize: 20,
                borderRadius: '10px',
                border: '1px solid rgba(119, 177, 212, 1)',
              }}
            >
              <Stack alignItems="center" spacing={5}>
                <Box
                  component="img"
                  src={addImage}
                  sx={{
                    aspectRatio: '1',
                    width: '30px !important',
                    height: 'auto',
                  }}
                  alt="image"
                />
                <Typography sx={{ color: 'rgba(119, 177, 212, 0.5)' }}>
                  Upload Image
                </Typography>
              </Stack>
              <Button
                variant="contained"
                component="label"
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  padding: '0',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  },
                  '&:active': {
                    boxShadow: 'none',
                  },
                  '&:focus': {
                    boxShadow: 'none',
                  },
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Stack>
  )
}

export default ImagesStep
