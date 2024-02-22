import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import $axios from "../../lib/axios.instance";
import ProductDescription from "../components/ProductDescription";
import ProductImage from "../components/ProductImage";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLarge = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "lg")
  );
  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { isLoading, data } = useQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${id}`);
    },
  });

  const productData = data?.data?.product;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: isMobile
          ? "column"
          : isMedium
          ? "row"
          : isLarge
          ? "row"
          : "row",
        margin: "auto",
        mt: isMobile ? "4rem" : isMedium ? "8rem" : isLarge ? "10rem" : "10rem",
        p: isMobile ? "2rem" : isMedium ? "1.5rem" : isLarge ? "2rem" : "2rem", //
        // gap: "1rem",
        width: isExtraLarge ? "60%" : "88%",
        borderRadius: "0.5rem",
        boxShadow:
          " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <ProductImage imageUrl={productData?.image} />
      <ProductDescription {...productData} />
    </Box>
  );
};

export default ProductDetail;
