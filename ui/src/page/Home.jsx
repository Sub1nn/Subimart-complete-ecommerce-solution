import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useParams } from "react-router-dom";
import "./home.css";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";

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
    </>
  );
};

export default Home;
