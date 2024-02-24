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

const BuyerProductList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["buyer-product-list", page, searchText],
    queryFn: async () => {
      return await $axios.post("/product/buyer/list", {
        page: page,
        limit: 4,
        searchText: searchText,
      });
    },
  });

  const productData = data?.data?.products;
  const totalPages = data?.data?.numberOfPages;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{ display: "grid", placeContent: "flex-end", m: "0 3rem 2rem 0" }}
      >
        <TextField
          value={searchText}
          label="Search"
          variant="standard"
          onChange={(event) => {
            setSearchText(event?.target?.value || " ");
          }}
        />
      </Box>
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
