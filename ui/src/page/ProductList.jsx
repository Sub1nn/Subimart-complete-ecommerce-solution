import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, useMediaQuery } from "@mui/material";

const ProductList = () => {
  const userRole = localStorage.getItem("role");

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
    </Box>
  );
};

export default ProductList;
