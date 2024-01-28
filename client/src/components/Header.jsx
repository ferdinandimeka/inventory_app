/* eslint-disable react/prop-types */
import { Typography, Box, useTheme } from '@mui/material'

const Header = ({ title, subtitle }) => {

    const theme = useTheme()

  return (
    <Box>
        <Typography variant="h2" sx={{ color: theme.palette.text.primary, mb: "5px" }}>
            {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header