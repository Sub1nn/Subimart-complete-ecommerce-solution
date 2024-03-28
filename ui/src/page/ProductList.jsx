import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import SearchProduct from "../components/SearchProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../store/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("role");

  const { isFilterApplied } = useSelector((state) => state.product);

  return (
    <>
      <Stack direction={"row"} spacing={4} mb={"1rem"}>
        {isFilterApplied && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(clearFilter());
            }}
          >
            clear filter
          </Button>
        )}
        <ProductFilter />
        <SearchProduct />
      </Stack>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
      </Box>
    </>
  );
};

export default ProductList;
