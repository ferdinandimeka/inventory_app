import { useState } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import OverviewChart from '../../components/OverviewChart';
import Header from '../../components/Header';

const Overview = () => {

    const [view, setView] = useState("units")

  return (
    <Box m="1.5rem 2.5rem">
        <Header
            title="Overview"
            subtitle="See the overall performance of the store"
        />
        <Box height="70vh">
            <FormControl sx={{ mt: '1rem' }}>
                <InputLabel id="demo-simple-select-label">View</InputLabel>
                <Select
                    value={view}
                    label="View"
                    onChange={(e) => setView(e.target.value)}
                >
                    <MenuItem value="units">Units</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view} />
        </Box>
    </Box>
  )
}

export default Overview