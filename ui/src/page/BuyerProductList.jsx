import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import { CircularProgress, Grid, Stack } from "@mui/material";
import Loader from "../components/Loader";

const BuyerProductList = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["buyer-product-list"],
    queryFn: async () => {
      return await $axios.post("/product/buyer/list", {
        page: 1,
        limit: 5,
      });
    },
  });

  const productData = data?.data?.products;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Grid container spacing={4} justifyContent="center">
        {productData.map((item) => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default BuyerProductList;
