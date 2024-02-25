import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; //its a component that helps to slide images in our hero/home section
import "react-responsive-carousel/lib/styles/carousel.min.css"; // css for react carousel component
import { Link } from "react-router-dom";
import "./home.css";

export const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:3000/product/buyer/list"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();
        console.log(data);
        setProduct(data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {product.map((item) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/product/details/${item.id}`}
              key={item.id}
            >
              <div className="posterImage">
                <img
                  src={
                    "https://media.istockphoto.com/id/524085051/photo/beautiful-exterior-of-new-luxury-home-at-twilight.jpg?s=612x612&w=0&k=20&c=wPqEpJkL22wE3NHSCgdWXq2FC8a-KvSCpP7XRIZHuOU="
                  }
                  alt={item.name}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {item ? item.name : ""}
                </div>
                <div className="posterImage__runtime">
                  {item ? item.brand : ""}
                  <span className="posterImage__rating">
                    {item ? item.category : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {item ? item.description : ""}
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
