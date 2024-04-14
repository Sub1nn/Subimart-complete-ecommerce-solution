import React from "react"
// import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./home.css"
import { useQuery } from "react-query"
import $axios from "../../lib/axios.instance"
import Loader from "../components/Loader"
import { Grid, Stack, Typography } from "@mui/material"
import ProductCard from "../components/ProductCard"
import SlidingCarousel from "../components/Carousel"

const Home = () => {
  const navigate = useNavigate()

  const { isLoading, data } = useQuery({
    queryKey: ["product-carousel"],
    queryFn: async () => {
      return await $axios.get("/product/carousel/list")
    },
  })
  const productData = data?.data?.products
  if (isLoading) {
    return <Loader />
  }
  // Limiting popular products to 6 items
  // Ensure productData is not empty before slicing
  const popularProducts =
    productData && productData.length > 0 ? productData.slice(0, 6) : []

  return (
    <>
      <SlidingCarousel />
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Popular Products
        </Typography>
      </div>
      <Grid container spacing={4} justifyContent="center" mt={"1px"}>
        {popularProducts.map((item) => {
          if (item && item.id) {
            return (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  {...item}
                  onClick={() => navigate(`/product/detail/${item.id}`)}
                />
              </Grid>
            )
          } else {
            return null
          }
        })}
      </Grid>
    </>
  )
}

export default Home
