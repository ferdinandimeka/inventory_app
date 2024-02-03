import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useGetPerformanceQuery } from "../../state/api";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../../components/DatagridCustomColumnMenu";

const Performance = () => {

    const theme = useTheme()
    const userId = useSelector((state) => state.global.userId)
    const { data, isLoading } = useGetPerformanceQuery(userId)

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
    <Box m="1.5rem 2.5rem">
        <Header title="Performance" subtitle="Track Affiliate Sales Performance" />
        <Box 
            mt="40px" 
            height="70vh"
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none',
                    backgroundColor: 'none',
                    color: theme.palette.text.primary,
                    '& .MuiDataGrid-cell': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.background.main,
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'none',
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                    },
                    '& .MuiDataGrid-row': {
                        backgroundColor: theme.palette.background.main,
                    },
                },
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                rows={(data && data.sales) || []}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{
                    ColumnMenu: CustomColumnMenu,
                }}
            />
        </Box>
    </Box>
  )
}

export default Performance