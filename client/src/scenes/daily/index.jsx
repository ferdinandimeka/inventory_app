import { useMemo, useState } from "react"
import { Box, useTheme } from "@mui/material"
import { ResponsiveLine } from "@nivo/line"
import Header from "../../components/Header"
import { useGetSalesQuery } from "../../state/api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {

    const [endDate, setEndDate] = useState(new Date('2021-10-01'));
    const [startDate, setStartDate] = useState(new Date('2021-09-01'));
    const theme = useTheme()
    const { data } = useGetSalesQuery()

    const [formattedData] = useMemo(() => {
        if (!data || typeof data.dailyData !== 'object') return [];

        const { dailyData } = data;
        const totalSalesLine = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: []
        }

        const totalUnitLine = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: []
        }

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date)
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf("-") + 1)

                totalSalesLine.data.push({ x: splitDate, y: totalSales });
                totalUnitLine.data.push({ x: splitDate, y: totalUnits });
            }
        })
        const formattedData = [totalSalesLine, totalUnitLine]
        return [formattedData]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, startDate, endDate])
      
    return (
        <Box m="1.5rem 2.5rem">
            <Header title='Daily Sales' subtitle="See the daily sales and units sold" />
            <Box height="70vh">
                <Box display="flex" jsutifyContent="flex-end">
                    <Box>
                        <DatePicker 
                            selected={startDate}
                            onChange={date => setStartDate(date)} 
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>

                    <Box>
                        <DatePicker 
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>
                </Box>

                { data ? (
                    <ResponsiveLine
                    data={formattedData}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.secondary[50],
                            },
                        },
                    }}
                    colors={{ scheme: 'nivo' }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 4,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend: 'Month',
                        legendOffset: 60,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickValues: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Total',
                        legendOffset: -50,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 50,
                            translateY: 0,
                            itemsSpacing: 1,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                ) : (
                    <>loading...</>
                )}
            </Box>
        </Box>
    )
}

export default Daily