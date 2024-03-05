import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import Loader from "../components/Loader";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import NoProductFound from "../components/NoProductFound";

const BuyerProductList = () => {
  const [page, setPage] = useState(1);

  const { searchText, category } = useSelector((state) => state.product);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["buyer-product-list", page, searchText, category],
    queryFn: async () => {
      return await $axios.post("/product/buyer/list", {
        page: page,
        limit: 4,
        searchText: searchText,
        category: category || null,
      });
    },
  });
  // console.log(data);
  const productData = data?.data?.products;
  const totalPages = data?.data?.numberOfPages;
  // console.log(productData);

  if (isLoading) {
    return <Loader />;
  }
  if (productData.length === 0) {
    return <NoProductFound />;
  }
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
      <Pagination
        page={page}
        count={totalPages}
        color="secondary"
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
