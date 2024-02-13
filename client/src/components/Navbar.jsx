/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined,
    ArrowDropDownOutlined
 } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, setMode } from '../state'
import FlexBetween from './FlexBetween'
//import profileImage from '../assets/images/profile.jpg'
import { useTheme } from '@emotion/react'
import { AppBar, IconButton, InputBase, Toolbar, Box , Typography, MenuItem, Menu,
    Button} from '@mui/material'
import { useLogoutUserMutation } from '../state/api'

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [ logoutUser ] = useLogoutUserMutation()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userInfo } = useSelector((state) => state.global)
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }  
    }

  return (
    <AppBar sx={{
        position: 'static',
        background: "none",
        boxShadow: "none",
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left side */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="9px"
                    gap="3rem"
                    p="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            {/* Right side */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{ fontSize: "75%" }} />
                    ) : (
                    <LightModeOutlined  sx={{ fontSize: "75%" }} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "75%" }} />
                </IconButton>

                <FlexBetween>
                    <Button
                        onClick={handleClick}
                        sx={{
                            color: theme.palette.secondary[200],
                            display: "flex",
                            textTransform: "none",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                            "&:hover": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary.main,
                            },
                        }}
                    >
                        <Box
                            component="img"
                            alt="profile"
                            src={user.photo}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                sx={{ color: theme.palette.secondary.main }}
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                fontSize="0.rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                {user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{ color: theme.palette.secondary[200], fontSize: "25px" }}
                        />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar