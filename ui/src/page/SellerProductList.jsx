import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";

const SellerProductList = ({ productData }) => {
  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        {productData.map((item) => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SellerProductList;
