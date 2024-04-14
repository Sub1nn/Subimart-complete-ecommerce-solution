import React from "react"
import Carousel from "react-material-ui-carousel"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import $axios from "../../lib/axios.instance"
import Loader from "./Loader"
import { Box, Stack, Typography } from "@mui/material"

function SlidingCarousel(props) {
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

  return (
    <Box sx={{ width: "100%", borderRadius: "5px" }}>
      <Carousel>
        {productData.map((product, index) => (
          <Link
            style={{
              textDecoration: "none",
              color: "white",
            }}
            to={`/product/detail/${product.id}`}
            key={product.id}
          >
            <Stack
              sx={{
                position: "relative",
                height: "500px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  margin: "auto",
                }}
              />

              <Stack
                sx={{
                  width: "100%",
                  position: "absolute",
                  padding: "2rem",
                  bottom: 0,
                  background:
                    "linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1))",
                  opacity: 0.85,
                  transition: "opacity 0.3s",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "900",
                    mb: "0.4rem",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography sx={{ fontSize: "2rem", mb: "0.5rem" }}>
                  {product.brand}
                </Typography>
                <Typography sx={{ fontStyle: "italic", width: "50%" }}>
                  {product.description}...
                </Typography>
              </Stack>
            </Stack>
          </Link>
        ))}
      </Carousel>
    </Box>
  )
}

export default SlidingCarousel
