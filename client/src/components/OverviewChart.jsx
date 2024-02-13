import { useMemo } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../state/api";

// eslint-disable-next-line react/prop-types
const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { isLoading, data } = useGetSalesQuery();

    const [ totalSalesLine, totalUnitLine ] = useMemo(() => {
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

        Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
            const currSales = acc.sales + totalSales;
            const currUnits = acc.units + totalUnits;

            totalSalesLine.data.push({ x: month, y: currSales });
            totalUnitLine.data.push({ x: month, y: currUnits });
            return { sales: currSales, units: currUnits };
        }, { sales: 0, units: 0 })

        return [ [totalSalesLine], [totalUnitLine] ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (!data || isLoading) return 'Loading...';

    return (
        <ResponsiveLine
            data={view === 'sales' ? totalSalesLine : totalUnitLine}
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
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: isDashboard ? "" : 'Month',
                legendOffset: 42,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickValues: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? '' : `Total ${view === 'sales' ? 'revenue' : 'units'} for year`,
                legendOffset: -60,
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
            legends={
                !isDashboard ? [
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: false,
                        translateX: 20,
                        translateY: -50,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.75,
                        symbolSize: 18,
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
                ] : []
            }
        />
    )
}

export default OverviewChart;