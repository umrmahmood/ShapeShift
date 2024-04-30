import React, { useState, useEffect } from "react";
import axios from "axios";

const UserShop = () => {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/shop")
      .then((response) => {
        setShopData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!shopData) {
    console.log("No shop data available");
    return null;
  }
  return (
    <div className="shop-container">
      {setShopData && (
        <>
          <div className="main-section">
            {/* <img src={shopData.mainImage} alt="Main Image" className="main-image" /> */}
            {/* <div className="logo">{shopData.logo}</div> */}
            <div className="shop-info">
              <h2>{shopData.name}</h2>
              <p>Ratings by users: {shopData.ratings}</p>
            </div>
          </div>
          <div className="user-section">
            <img
              src={shopData.userImage}
              alt="User Image"
              className="user-image"
            />
            <div className="user-info">
              <h3>{shopData.ownerName}</h3>
              <button>Contact</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UserShop;
