import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserShop.css"; 
import placeholder from "./placeholder.jpg";

const UserShop = () => {
  // const [shopData, setShopData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("/api/shop")
  //     .then((response) => {
  //       setShopData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching shop data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!shopData) {
  //   console.log("No shop data available");
  //   return null;
  // }
  return (
    <div className="shop-container">
    <div className="banner-container">
        <img  src={placeholder} alt="Banner"/>
        </div>
        <div className="shop-info-container">
        <div className="user-shop">
          <div className="shop-image">
            <img  src={placeholder} alt="Shop"  />
          </div>
          <div className="shop-details">
            <h3>Shop Name</h3>
            <p>Owner: Owner Name</p>
            <p>Raitings</p>
          </div>
        </div>
        <div className="owner-shop">
          <div className="shop-image">
            <img  src={placeholder} alt="Owner"  />
          </div>
          <div className="shop-details">
            <h3>Owner Shop Name</h3>
            <p>Owner: Owner Name</p>
          </div>
        </div>
      </div>
       <div className="additional-info">
        <h2>Additional Information</h2>
        <ul>
          <li>Delivery</li>
          <li>Finance</li>
          <li>Orders & Shipping</li>
        </ul>
      </div>
    </div>
  );
};
export default UserShop;
