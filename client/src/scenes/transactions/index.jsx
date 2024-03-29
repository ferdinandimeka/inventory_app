import { useState } from "react"
import { Box, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../../components/Header"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
import { useGetTransactionsQuery } from "../../state/api"

const Transactions = () => {
    const theme = useTheme()

    const [pageSize, setPageSize] = useState()
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")

    const [searchInput, setSearchInput] = useState("")
    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "userId", headerName: "User ID", flex: 1 },
        { field: "createdAt", headerName: "CreatedAt", flex: 1 },
        { field: "products", headerName: "No of Products", flex: 1,
            renderCell: (params) => {
                return params.value.length
            },
        },
        { field: "cost", headerName: "Cost", flex: 1,
        renderCell: (params) => {
            return `$${Number(params.value).toFixed(2)}`
        }, },
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Transactions" subtitle="Entire list of transactions" />
            <Box
                height="80vh"
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
                            '&:nth-of-type(even)': {
                                backgroundColor: theme.palette.background.main,
                            },
                        },
                        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                            color: theme.palette.secondary[600],
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: theme.palette.background.main,
                            color: theme.palette.text.primary,
                        },
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data && data.transactions || []}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[20, 50, 100]}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{
                        Toolbar: DataGridCustomToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            searchInput,
                            setSearchInput,
                            setSearch
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions