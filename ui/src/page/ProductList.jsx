import React, { useState } from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, Button, Pagination, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import SearchProduct from "../components/SearchProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../store/slices/productSlice";
import { FilterAltOffOutlined } from "@mui/icons-material";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";
import NoProductFound from "../components/NoProductFound";

const ProductList = () => {
  const [spage, setsPage] = useState(1);
  const [bpage, setbPage] = useState(1);

  const dispatch = useDispatch();
  const userRole = localStorage.getItem("role");

  const { searchText, category, minPrice, maxPrice, isFilterApplied } =
    useSelector((state) => state.product);

  const token = localStorage.getItem("token");

  const fetchBuyerProducts = async () => {
    return await $axios.post("/product/buyer/list", {
      page: bpage,
      limit: 4,
      searchText: searchText,
      category: category || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      isFilterApplied: isFilterApplied,
    });
  };

  const fetchSellerProducts = async () => {
    return await $axios.post("/product/seller/list", {
      page: spage,
      limit: 4,
      searchText: searchText,
      category: category || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      isFilterApplied: isFilterApplied,
    });
  };

  const { isLoading: isLoadingBuyer, data: dataBuyer } = useQuery(
    ["buyer-product-list", bpage, searchText, category],
    fetchBuyerProducts,
    { enabled: userRole === "buyer" }
  );

  const { isLoading: isLoadingSeller, data: dataSeller } = useQuery(
    ["seller-product-list", spage, searchText, category],
    fetchSellerProducts,
    { enabled: userRole === "seller" }
  );

  const onbChange = (event, value) => {
    setbPage(value);
  };

  const onsChange = (event, value) => {
    setsPage(value);
  };

  const buyerProductData = dataBuyer?.data?.products;
  const totalbPages = dataBuyer?.data?.numberOfPages;

  const sellerProductList = dataSeller?.data?.products;
  const totalsPages = dataSeller?.data?.numberOfPages;

  const renderProductList = () => {
    if (userRole === "buyer") {
      if (isLoadingBuyer) {
        return <Loader />;
      } else if (!buyerProductData || buyerProductData.length === 0) {
        return <NoProductFound />;
      } else {
        return <BuyerProductList productData={buyerProductData} />;
      }
    } else if (userRole === "seller") {
      if (isLoadingSeller) {
        return <Loader />;
      } else if (!sellerProductList || sellerProductList.length === 0) {
        return <NoProductFound />;
      } else {
        return <SellerProductList productData={sellerProductList} />;
      }
    }
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ minHeight: "100vh", justifyContent: "space-between" }}
    >
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={4}
          mb={"1rem"}
        >
          {isFilterApplied && (
            <Button
              variant="text"
              startIcon={<FilterAltOffOutlined />}
              color="error"
              onClick={() => {
                dispatch(clearFilter());
              }}
            >
              Clear
            </Button>
          )}
          <ProductFilter />
          <SearchProduct />
        </Stack>
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        {renderProductList()}
      </Box>
      <Box>
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "2.5rem",
          }}
          page={userRole === "seller" ? spage : bpage}
          count={userRole === "seller" ? totalsPages : totalbPages}
          color="secondary"
          onChange={userRole === "seller" ? onsChange : onbChange}
        />
      </Box>
    </Stack>
  );
};

export default ProductList;
