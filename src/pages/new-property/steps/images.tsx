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
        const imageUrl = URL.createObjectURL(image)
        append({ image: imageUrl, description: '' })
      }
    }
  }
  const [description, setDescription] = useState('')
  const maxWords = 150

  const handleDescriptionChange =
    (index: number) => (event: React.FocusEvent<HTMLInputElement>) => {
      const text = event.target.value

      if (text.length <= maxWords) {
        update(index, { ...fields[index], description: text })
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
        spaceBetween={20}
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
            <Stack width="100%" height="75%" justifyContent="space-between">
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
              <Box sx={{ position: 'relative', width: '100%', height: '30%' }}>
                <TextField
                  placeholder="Description"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  defaultValue={field.description}
                  onBlur={handleDescriptionChange(index)}
                  slotProps={{
                    input: { sx: { borderRadius: '10px' } },
                  }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ position: 'absolute', bottom: 0, right: 8 }}
                >
                  {field.description.length}/{maxWords}
                </Typography>
              </Box>
            </Stack>
          </SwiperSlide>
        ))}
        <SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
    </Stack>
  )
}

export default ImagesStep
