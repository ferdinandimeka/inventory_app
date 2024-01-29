import { Box, useTheme } from '@mui/material'
import Header from '../../components/Header'
import { useGetCustomersQuery } from '../../state/api'
import { DataGrid } from '@mui/x-data-grid'

const Customers = () => {

    const theme = useTheme()
    const { data, isLoading } = useGetCustomersQuery()

    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 0.6, 
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
          }, },
        { field: 'country', headerName: 'Country', flex: 0.5 },
        { field: 'occupation', headerName: 'Occupation', flex: 1 },
        { field: 'role', headerName: 'Role', flex: 0.5 },
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Customers" subtitle="See lists of customers" />
        <Box
            mt="40px"
            height="75vh"
            sx={{
                '& .MuiDataGrid-root': {
                    border: `1px solid ${theme.palette.secondary[300]}`,
                    borderRadius: "10px",
                    '& .MuiDataGrid-cell': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.background.main,
                    },
                    '& .MuiDataGrid-columnHeader': {
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                    },
                    '& .MuiDataGrid-row': {
                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.secondary[700],
                        },
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: theme.palette.primary[600],
                    },
                },
            }}
        >
            <DataGrid  
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
            />
        </Box>
    </Box>
  )
}

export default Customers