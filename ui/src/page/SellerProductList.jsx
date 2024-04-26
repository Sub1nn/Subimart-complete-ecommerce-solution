import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import React from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import $axios from "../../lib/axios.instance"
import ProductCard from "../components/ProductCard"
import Loader from "../components/Loader"
import { useSelector } from "react-redux"

const SellerProductList = () => {
  const navigate = useNavigate()

  const { searchText, category, minPrice, maxPrice, isFilterApplied } =
    useSelector((state) => state.product)

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ["seller-product-list", searchText, category],
    queryFn: () => {
      return $axios.post("/product/seller/list", {
        page: 1,
        limit: 10,
        searchText: searchText,
        category: category || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        isFilterApplied: isFilterApplied,
      })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const productList = data?.data?.products

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        {productList.map((item) => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard {...item} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default SellerProductList
