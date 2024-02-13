import { Box, Typography, useTheme, Button } from '@mui/material'
//import FlexBetween from '../../components/FlexBetween'
import Header from '../../components/Header'
import dashboard from '../../assets/images/dashboard.jpg'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
//import { useSelector } from 'react-redux'

const Home = () => {

  const theme = useTheme()
  const matches = useMediaQuery('(max-width:1200px)')
  const navigate = useNavigate()
  // const { userInfo } = useSelector((state) => state.global)

  const clickHandler = (path) => {
    navigate(path)
  }

  return (
    <Box height="90vh" maxWidth={matches ? "100%" : "80%"}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        mt: '1rem'
      }}>

        <Box
          sx={{
            justifyContent: 'flex-start',
            color: theme.palette.secondary[500],
            ml: { xs: '2rem', sm: '5rem', md: '10rem'},
          }}
        >
          <Typography sx={{
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 'bold'
          }}>
            FEDECO
          </Typography>
        </Box>

        <Box
          sx={{
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={() => {clickHandler('/signup')}}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.alt,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              width: { xs: '5rem', sm: '6rem' },
              borderRadius: '2rem',
              boxShadow: theme.shadows[10]
            }}>
              Sign Up
          </Button> 

          <Button
            variant="contained"
            onClick={() => {clickHandler('/login')}}
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.alt,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              width: { xs: '5rem', sm: '6rem' },
              borderRadius: '2rem',
              ml: '1rem',
              mr: { xs: '2rem', sm: '5rem' },
            }}>
              Log In
          </Button> 
        </Box>
      </Box>

        <Box 
          m={{ xs: "3rem 3rem", sm: "5rem 5rem", md: "5rem 10rem"}}
          display={matches ? 'grid' : 'flex' }
          // maxWidth={matches ? "100%" : "50%"}
        >
            <Box
             width="400px"
            >
              <Header
                title="Sales And Data Analysis For Admin"
              />
              <Typography variant="body1" color={theme.palette.secondary[200]}>
                Welcome to the admin dashboard. Here you can view and manage sales, products, customers, and transactions.
              </Typography>
              
              <Box 
                mt="2.5rem"
              >
                <Button
                  variant="contained"
                  onClick={() => {clickHandler('/dashboard')}}
                  sx={{
                    backgroundColor: theme.palette.secondary[500],
                    color: theme.palette.background.alt,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    padding: '0.5rem 1rem',
                    width: '10rem',
                  }}>
                    Explore
                </Button> 
              </Box>
            </Box>
          <Box
            mb={!matches ? "5rem" : "3rem"}
            mt={matches && "3rem"}
            ml={!matches && "5rem"}
            component="img"
            alt="dashboard"
            src={dashboard}
            width='100%'
            //height={matches ? "90%" : "60%"}
            borderRadius="2rem"
            boxShadow={theme.shadows[10]}
          />
        </Box>

    </Box>
  )
}

export default Home