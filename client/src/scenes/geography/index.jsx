import { Box, useTheme, CircularProgress, Typography } from "@mui/material";
import { useGetGeographyQuery } from "../../state/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import Header from "../../components/Header";
import { geoGraphyData } from "../../state/geographyData";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Geography"
        subtitle="See the geographical distribution of customers"
      />

      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[300]}`}
        borderRadius="10px"
      >
        {data ? (
          <ResponsiveChoropleth
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
            data={data}
            features={geoGraphyData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -150,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 0.5,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
            <Typography variant="h4">No Customers Location</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
