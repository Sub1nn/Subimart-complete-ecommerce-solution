import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useParams } from "react-router-dom";
import "./home.css";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";
import { Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["product-carousel"],
    queryFn: async () => {
      return await $axios.get("/product/carousel/list");
    },
  });

  const productData = data?.data?.products;
  console.log(productData);

  if (isLoading) {
    return <Loader />;
  }

  // Limiting popular products to 6 items
  const popularProducts = productData.slice(0, 6);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
        >
          {productData.map((product) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/product/details/${product.id}`}
              key={product.id}
            >
              <div className="posterImage">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {product ? product.name : ""}
                </div>
                <div className="posterImage__brand">
                  {product ? product.brand : ""}
                </div>
                <div className="posterImage__description">
                  {product ? product.description : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
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
          return (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
