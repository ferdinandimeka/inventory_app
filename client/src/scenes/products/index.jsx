/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  CardActions,
  Rating,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useGetProductsQuery } from "../../state/api";
import Header from "../../components/Header";

const Product = ({
  _id,
  name,
  price,
  description,
  category,
  rating,
  supply,
  stats,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.6rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {category}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${Number(price).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {supply}
        </Typography>

        <Rating value={rating} readOnly />
        <Typography variant="body2">description</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? "Hide" : "Show"} Stats
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stats.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stats.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const isSmall = useMediaQuery("(min-width: 1000px)");

  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {<CircularProgress color="secondary" />}
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="See lists of products" />
      {data || isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isSmall ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              decription,
              price,
              rating,
              category,
              supply,
              stats,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={decription}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stats={stats}
              />
            )
          )}
        </Box>
    ) : (
        <Typography variant="h4">No Products</Typography>
    )}
    </Box>
  );
};

export default Products;
