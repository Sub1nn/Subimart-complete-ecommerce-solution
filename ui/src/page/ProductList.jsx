import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, useMediaQuery } from "@mui/material";

const ProductList = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const userRole = localStorage.getItem("role");

  return (
    <Box
      sx={{
        mt: isMobile ? "3.5rem" : "5rem",
        padding: "1rem",
      }}
    >
      {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
    </Box>
  );
};

export default ProductList;
