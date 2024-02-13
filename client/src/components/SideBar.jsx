/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Box, Divider, Typography, List, ListItem, ListItemIcon, ListItemText,
    IconButton, Drawer, useTheme, ListItemButton
} from '@mui/material'
import {
    HomeOutlined, SettingsOutlined, PieChartOutlined,
    TrendingUpOutlined, ChevronLeft, ChevronRightOutlined, 
    Groups2Outlined, PublicOutlined, ReceiptLongOutlined, PointOfSaleOutlined,
    ShoppingCartOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined,
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'


const SideBar = ({user, drawerWidth, isSideBarOpen, setIsSideBarOpen, isNonMobile}) => {
    const { pathname } = useLocation()
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()

    const navItems = [
        {
          text: "Dashboard",
          icon: <HomeOutlined />,
        },
        {
          text: "Client Facing",
          icon: null,
        },
        {
          text: "Products",
          icon: <ShoppingCartOutlined />,
        },
        {
          text: "Customers",
          icon: <Groups2Outlined />,
        },
        {
          text: "Transactions",
          icon: <ReceiptLongOutlined />,
        },
        {
          text: "Geography",
          icon: <PublicOutlined />,
        },
        {
          text: "Sales",
          icon: null,
        },
        {
          text: "Overview",
          icon: <PointOfSaleOutlined />,
        },
        {
          text: "Daily",
          icon: <TodayOutlined />,
        },
        {
          text: "Monthly",
          icon: <CalendarMonthOutlined />,
        },
        {
          text: "Breakdown",
          icon: <PieChartOutlined />,
        },
        {
          text: "Management",
          icon: null,
        },
        {
          text: "Admin",
          icon: <AdminPanelSettingsOutlined />,
        },
        {
          text: "Performance",
          icon: <TrendingUpOutlined />,
        },
      ];

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])
    

  return (
    <Box component="nav">
        {isSideBarOpen && (
            <Drawer
                open={isSideBarOpen}
                onClose={() => setIsSideBarOpen(false)}
                variant='persistent'
                anchor="left"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": { 
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.default,
                        borderWidth: isNonMobile ? 0 : "2px",
                        color: theme.palette.secondary[200],
                    },
                }}
            >

            <Box width="100%">
                <Box m='1.5rem 2rem 2rem 3rem'>
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display='flex' alignItems="center" gap="0.5rem">
                            <Typography 
                                fontWeight="bold"
                                variant="h4"
                                onClick={() => navigate('/')}
                                sx={{ cursor: "pointer" }}
                            >FEDECO</Typography>
                        </Box>
                        {!isNonMobile && (
                            <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {navItems && navItems.map((item) => {
                        if (item.icon === null) {
                            const upperCaseText = typeof item.text === 'string' ? item.text.toUpperCase() : item.text;
                            return (
                                <Typography key={item.text} sx={{ m: "1rem 2rem 0.5rem 3rem" }}>
                                    {item.text ? upperCaseText : null}
                                </Typography>
                            )
                        }
                        const lowerCaseText = typeof item.text === 'string' ? item.text.toLowerCase() : item.text;
                        const Text = lowerCaseText

                        return (
                            <ListItem key={item.text} disablePadding >
                                <ListItemButton
                                    onClick={() => navigate(`/${Text}`)}
                                    setActive={Text}
                                    sx={{
                                        borderRadius: "0 30px 30px 0",
                                        backgroundColor: active === Text ? theme.palette.secondary[300] : "transparent",
                                        color: active === Text ? theme.palette.primary[600] : theme.palette.secondary[200],
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            ml: "2rem",
                                            color: active === Text ? 
                                            theme.palette.primary[600] : theme.palette.secondary[200],
                                        }}    
                                    >
                                        {item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.text} />
                                    {active === Text && (
                                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        )
                    } 
                )}
                </List>
            </Box>

            <Box bottom="4rem">
                <Divider />
                <FlexBetween textTransform="none" gap="1.0rem" m="1.5rem 2rem 2rem 3rem">
                    <Box
                        component="img"
                        alt="profile"
                        src={user.photo}
                        height="40px"
                        width="40px"
                        borderRadius="50%"
                        sx={{ objectFit: "cover" }}
                    />
                    <Box textAlign="left">
                        <Typography
                            fontWeight="bold"
                            fontSize="0.9rem"
                            sx={{ color: theme.palette.secondary.main }}
                        >
                            {user.name}
                        </Typography>

                        <Typography
                            fontWeight="bold"
                            fontSize={12}
                            sx={{ color: theme.palette.secondary[200] }}
                        >
                            {user.role}
                        </Typography>
                    </Box>
                    <SettingsOutlined
                        sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                    />
                </FlexBetween>
            </Box>
        </Drawer>
        )}
    </Box>
  )
}

export default SideBar