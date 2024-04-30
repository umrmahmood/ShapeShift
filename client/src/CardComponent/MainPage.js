import React, { useState, useEffect } from "react";
import "./Card.css";
import Card from "./Card";
import Categories from "./Categories";
import TopButton from "./TopButton";
import axios from "axios";
import placeholder from "./placeholder.jpg";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  const handleMoreClick =(productId) => {
    navigate(`/item/${productId}`);
};

const renderCardBlock = (startIndex) => {
    return (
        <div className="card-block">
            {products.slice(startIndex, startIndex + 4).map((product) => (
          <Card
            key={product.id}
            product={product}
            onMoreClick={() => handleMoreClick(product.id)} // Pass handleMoreClick function as prop
            />
            ))}
        </div>
    )
}
  return (
    <div className="main-layout">
      <Categories />
      {renderCardBlock(4)}
      <div className="banner-section">
        <div className="banner-left">
          <img
            src={placeholder}
            alt="name"
            style={{ height: "200px", width: "300px" }}
          />
        </div>
        <div className="banner-right">
          <img
            src={placeholder}
            alt="name"
            style={{ height: "200px", width: "300px" }}
          />
        </div>
      </div>
      {renderCardBlock(8)}

      {/* {products && <div className="item-container">
    {products.map((product, index) =>(
        <Card 
        product={product}
    key={product.id + "_" + index}

    />
    ))}
</div>} */}
      <TopButton />
    </div>
  );
};
export default MainPage;
