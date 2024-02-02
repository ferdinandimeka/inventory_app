import { Box, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useGetAdminQuery } from "../../state/api"
import Header from "../../components/Header"
import CustomColumnMenu from "../../components/DatagridCustomColumnMenu"

const Admin = () => {

    const { data, isLoading } = useGetAdminQuery()
    const theme = useTheme()

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.5
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.4
        },
        {
            field: 'occupation',
            headerName: 'Occupation',
            flex: 1
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            },
        },
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Admin" subtitle="Lists Of Admins" />
        <Box 
            mt="40px" 
            height="70vh"
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none',
                },
                '& .MuiDataGrid-columnsHeaders': {
                    backgroundColor: theme.palette.primary.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: "none",
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: "none"
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${theme.palette.secondary[200]} !important`
                },
            }}
        >
            <DataGrid
                rows={data || [] }
                columns={columns}
                getRowId={(params) => params._id}
                loading={isLoading || !data}
                slots={{
                    ColumnMenu: CustomColumnMenu,
                }}
            />
        </Box>
    </Box>
  )
}

export default Admin