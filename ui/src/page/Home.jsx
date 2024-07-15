import React, { useEffect, useState } from "react";
// import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
// import "./home.css"
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";
import { Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SlidingCarousel from "../components/Carousel";

const Home = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["product-popular"],
    queryFn: async () => {
      return await $axios.get("/product/popular/list");
    },
  });
  console.log(data);

  useEffect(() => {
    if (!isLoading && data) {
      const products = data?.data?.products || [];
      // Shuffle the products array
      const shuffledProducts = products.sort(() => Math.random() - 0.5);
      // Limiting popular products to 7 items
      const limitedProducts = shuffledProducts.slice(0, 8);
      setPopularProducts(limitedProducts);
    }
  }, [isLoading, data]);

  console.log(data);
  const productData = data?.data?.products;
  console.log(productData);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SlidingCarousel />

      <Grid container spacing={4} justifyContent="center" mt={"1px"}>
        {popularProducts.map((item) => {
          if (item && item.id) {
            return (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  {...item}
                  onClick={() => {
                    if (item.id) {
                      navigate(`/product/detail/${item.id}`);
                    } else {
                      console.error("Item ID is undefined:", item);
                    }
                  }}
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </>
  );
};

export default Home;
