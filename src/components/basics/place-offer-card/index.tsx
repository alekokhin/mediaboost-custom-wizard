import { Box, Icon } from '@mui/material'
import { cloneElement, ReactNode } from 'react'
type Props = {
  label: string
  key: string
  icon: ReactNode
}

const PlaceOfferCard = ({ icon, key, label }: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '50px',
        padding: '2px 8px',
        gap: '5px',
        height: '25px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Icon>
        {cloneElement(icon as React.ReactElement, {
          sx: { fontSize: '20px' },
        })}
      </Icon>
      <Box>{label}</Box>
    </Box>
  )
}
export default PlaceOfferCard
