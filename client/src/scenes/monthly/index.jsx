import { useMemo } from "react";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../../state/api";
import { ResponsiveLine } from "@nivo/line";

const Monthly = () => {

    const {data} = useGetSalesQuery();
    const theme = useTheme();

    const [ formattedData ] = useMemo(() => {
        if (!data || typeof data.monthlyData !== 'object') return [];

        const { monthlyData } = data;
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

        Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
            totalSalesLine.data.push({ x: month, y: totalSales });
            totalUnitLine.data.push({ x: month, y: totalUnits });
        })

        const formattedData = [totalSalesLine, totalUnitLine]
        return [formattedData]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    return (
        <Box m="1.5rem 2.5rem">
            <Header title='Monthly Sales' subtitle="See the Monthly sales" />
            <Box height="70vh">
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
                        tickSize: 5,
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

export default Monthly;