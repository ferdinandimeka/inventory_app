import { Box } from "@mui/material";
import Header from "../../components/Header";
import BreakDownChart from "../../components/BreakDownChart";

const Breakdown = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Breakdown" subtitle="Breakdown Of Sales By Category" />
            <Box mt="40px" height="70vh">
                <BreakDownChart />
            </Box>
        </Box>
    )
}

export default Breakdown