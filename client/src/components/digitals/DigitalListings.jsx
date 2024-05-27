import React, { useState, useEffect } from "react";
import axios from "axios";
import DigitalCard from "../../components/digitals/DigitalCard.jsx"
import "../../CardComponent/categories2.css";
import "../../components/digitals/digitalListings.css";
import digitalBanner from "../../assets/digitaladvert.jpg";
import { Link } from "react-router-dom";
const DigitalListings = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/digitals/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="digital-listing-container">
        <h1>Inquired Digital Products</h1>
        <div className="digital-listing-banner">
            <img src={digitalBanner} alt="banner" />
        </div>
      <div className="digital-lisitng-product-grid">
        {products.map((product) => (
          <DigitalCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DigitalListings;

