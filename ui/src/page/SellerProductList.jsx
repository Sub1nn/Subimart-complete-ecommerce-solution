import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import $axios from "../../lib/axios.instance";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ["seller-product-list"],
    queryFn: () => {
      return $axios.post("/product/seller/list", {
        page: 1,
        limit: 10,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const productList = data?.data?.products;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Stack alignItems={"flex-end"} mb={2}>
        <Button
          variant="contained"
          color="success"
          sx={{
            width: {
              xs: "100%",
              md: "20%",
            },
          }}
          onClick={() => {
            navigate("/product/add");
          }}
        >
          Add Product
        </Button>
      </Stack>
      <Grid container spacing={4} justifyContent="center">
        {productList.map((item) => {
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
