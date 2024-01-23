//import { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
//import { useSelector } from 'react-redux'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar'

const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
        <SideBar 
            isSideBarOpen={isSidebarOpen} 
            setIsSideBarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
        />
      <Box flexGrow={1}>
        <Navbar
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout