import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "./FlexBetween"

// eslint-disable-next-line react/prop-types
const StatBox = ({ title, value, increase, icon, description }) => {

    const theme = useTheme()

  return (
    <Box
        gridColumn="span 2"
        gridRow="span 1"
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        p='1.5rem 1rem'
        borderRadius='10px'
        boxShadow='0px 0px 10px rgba(0,0,0,0.1)'
        flex="1 1 100%"
        backgroundColor={theme.palette.background.paper} 
    >
        <FlexBetween>
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>{title}</Typography>
            {icon}
        </FlexBetween>

        <Typography
            variant="h4"
            sx={{ color: theme.palette.secondary[500], fontWeight: "bold" }}
        >
            {value}
        </Typography>

        <FlexBetween gap='1rem'>
            <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary[100] }}
            >
                {increase}
            </Typography>
            <Typography>{description}</Typography>
        </FlexBetween>
    </Box>
  )
}

export default StatBox