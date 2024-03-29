import { ResponsivePie } from '@nivo/pie'
import { useGetSalesQuery } from '../state/api'
import { Box, Typography, useTheme } from '@mui/material'

// eslint-disable-next-line react/prop-types
const BreakDownChart = ({ isDashboard=false }) => {

  const { data, isLoading } = useGetSalesQuery()
  const theme = useTheme()

  if (!data || isLoading) return <div>Loading...</div>

  const color = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ]

  const formattedData = Object.entries(data.salesByCategory).map(([category, sales], i) => ({
    id: category,
    label: category,
    value: sales,
    color: color[i],
  })
  )

  return (
    <Box
      height={isDashboard ? '400px' : '100%'}
      width={undefined}
      minHeight={isDashboard ? '325px' : undefined}
    >

      <ResponsivePie
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
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={isDashboard ? { top: 0, right: 70, bottom: 110, left: 60 } 
          : { top: 40, right: 80, bottom: 80, left: 80}}
          sortByValue={true}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.2
                  ]
              ]
          }}
          arcLinkLabelsSkipAngle={10}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsTextColor={theme.palette.secondary[200]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      2
                  ]
              ]
          }}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: isDashboard ? 20 : 0,
                  translateY: isDashboard ? 50 : 56,
                  itemsSpacing: 0,
                  itemWidth: 85,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: theme.palette.secondary[700],
                          }
                      }
                  ]
              }
          ]}
      />
    <Box
      position="absolute"
      // top='50%'
      // left='50%'
      color={theme.palette.secondary[400]}
      textAlign="center"
      pointerEvents="none"
      sx={{
        transform: isDashboard ? "translate(270%, -480%)"
        : "translate(100%, -400%)",
      }}
    >
      <Typography variant="h6">
        {!isDashboard && "Total:"} ${data.yearlySalesTotal}
      </Typography>
    </Box>

  </Box>
  )
}

export default BreakDownChart