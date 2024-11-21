import { Box, BoxProps, Icon } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import { COLORS } from 'constants/colors'
import { TYPES } from 'constants/types'
import { cloneElement } from 'react'
type Props = {
  select?: boolean
} & TYPES.PlaceOffer &
  BoxProps

const PlaceOfferCard = ({ icon, label, select, ...otherProps }: Props) => {
  const springProps = useSpring({
    transform: select
      ? 'scale(1.1) translateY(0px)' // Scale up and fall down when selected
      : 'scale(1) translateY(0px)', // Return to normal size and position
    opacity: select ? 1 : 0.8, // Fade slightly when not selected
    config: { tension: 200, friction: 12 }, // Adjust spring configuration
  })

  return (
    <animated.div // Wrap with `animated.div` to apply the animation
      style={{
        ...springProps, // Apply animation styles
      }}
    >
      <Box
        sx={{
          border: `1px solid  ${COLORS.Select}`,
          borderRadius: '50px',
          padding: '2px 8px',
          margin: '5px',
          gap: '5px',
          height: '25px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          cursor: 'pointer',
          background: select ? COLORS.Select : 'white',
          color: select ? '#fff' : COLORS.Select,
        }}
        {...otherProps}
      >
        <Icon>
          {cloneElement(icon as React.ReactElement, {
            sx: { fontSize: '20px' },
          })}
        </Icon>
        <Box>{label}</Box>
      </Box>
    </animated.div>
  )
}
export default PlaceOfferCard
