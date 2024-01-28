import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../../state/api'

const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId)
    const { data } = useGetUserQuery(userId)

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
        <SideBar
            user={data || {}}
            isSideBarOpen={isSidebarOpen} 
            setIsSideBarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
        />
      <Box flexGrow={1}>
        <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout