/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/sonar-no-unused-vars */
/* eslint-disable sonarjs/no-dead-store */
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import addImage from 'assets/icons/addImage.png'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ImagesStep = () => {
  const { control } = useFormContext<TYPES.PropertyFormData>()
  const [image, setImage] = useState('')
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'images',
  })

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }
  const [description, setDescription] = useState('')
  const maxWords = 150

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
      <Box
        sx={{
          borderRadius: 2,
          width: '100%',
          height: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {image ? (
          <Box
            component="img"
            src={image}
            alt="Uploaded"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '10px',
            }}
          />
        ) : (
          <Box
            sx={{
              height: '100%',
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
            <Stack alignItems="center" spacing={2}>
              <Box
                component="img"
                src={addImage}
                sx={{ aspectRatio: '1', width: '30px', height: 'auto' }}
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
        )}
      </Box>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          placeholder="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          slotProps={{ input: { sx: { borderRadius: '10px' } } }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ position: 'absolute', bottom: 8, right: 8 }}
        >
          {description.length}/{maxWords}
        </Typography>
      </Box>
    </Stack>
  )
}

export default ImagesStep
