/* eslint-disable react/jsx-no-duplicate-props */
import FlexBetween from "../../components/FlexBetween"
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material"
import Header from "../../components/Header"
import { DataGrid } from "@mui/x-data-grid"
import { useGetDashboardQuery } from "../../state/api"
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic
 } from "@mui/icons-material"
import BreakDownChart from "../../components/BreakDownChart"
import OverviewChart from "../../components/OverviewChart"
import StatBox from "../../components/StatBox"

const Dashboard = () => {

  const theme = useTheme()
  const { data, isLoading } = useGetDashboardQuery()
  const isMediumScreens = useMediaQuery("(min-width: 1200px)")

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: 'Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return params.value.length
      },
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => {
        return `$${Number(params.value).toFixed(2)}`
      },
    },
  ]

  return (
    <Box
      m="3.5rem 2.5rem"
      sx={{
        bottom: 5,
      }}
    >
      <FlexBetween>
        <Header title="Dashboard" subtitle="Overview of sales and performance" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.alt,
              fontSize: '0.63rem',
              fontWeight: 'bold',
              padding: '0.4rem 0.8rem',

              '&:hover': {
                backgroundColor: theme.palette.secondary[100],
                border: '2px solid',
              },
            }}
          >
            <DownloadOutlined sx={{ mr: '6px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      
      <Box 
        mt="20px"
        display='grid'
        // gridTemplateColumns={isMediumScreens ? '1fr 1fr' : '1fr'}
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div" : { gridColumn: isMediumScreens ? undefined : "span 12" }
        }}
      >
        {/* Row 1 */}
        <StatBox
          title="Total Customers"
          value={data?.totalCustomers}
          increase="+5.5%"
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          description="Since Last Month"
        />

        <StatBox
          title="Today Sales"
          value={data?.currentDayStats.totalSales}
          increase="+11%"
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          description="Increase in sales"
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.paper}
          p="1rem"
          borderRadius="10px"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data && data.currentMonthStats.totalSales}
          increase="+8%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Yearly Sales"
          value={data?.yearlySalesTotal}
          increase="+21%"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          description="Since Last Month"
        />

        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.paper}
          p="1.5rem"
          borderRadius="10px"
          mb="2rem"
        >
          <Typography variant="6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakDownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            mt="-1.5rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real sales and information via category for revenue made
            for this year and total sales.
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default Dashboard