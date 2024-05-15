import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/sellerShop.css";
import usericon from "../assets/usericon.png";
import ShopItems from "./ShopItems.jsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const SellerShop = () => {
  const { shopId } = useParams(); // Get shopId from URL parameter
  const [shop, setShop] = useState(null); // State to hold shop data
  const [owner, setOwner] = useState(null); // State to hold owner data
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Items");

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/shop/${shopId}`
        );
        setShop(response.data.shop);
        // Fetch owner's information
        const ownerId = response.data.shop.owner;
        const ownerResponse = await axios.get(
          `http://localhost:5001/api/users/profile/${ownerId}`
        );
        setOwner(ownerResponse.data.user);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        // Handle error or set a loading state
      }
    };

    fetchShop();
  }, [shopId]);

  //console.log("avatar", owner.profile.avatarUrl);
  const handleSectionClick = (section) => {
    setSelectedSection(section);
    navigate(`/shop/${shopId}?active=${section}`);
  };

  return (
    <div className="seller-shop-container">
      {console.log("profile", owner)}{" "}
      {shop && owner && (
        <>
          <div className="seller-shop-banner-container">
            <img src={shop.bannerUrl} alt="shopBanner" />
          </div>
          <div className="shop-info-container">
            <div className="seller-shop-image-container">
              <div className="shop-image">
                <img src={shop.avatarUrl} alt="ShopAvatar" />
              </div>
              <div className="shop-details">
                <h3>{shop.name}</h3>
                <p>
                  <span className="seller-shop-location">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                  </span>
                  {shop.location}
                </p>
              </div>
            </div>
            <div className="owner-shop">
              <div className="shop-image-owner">
                <img src={owner.profile.avatarUrl} alt="Owner" />
              </div>
              <div className="shop-detail-owner">
                <h3>{owner.profile.username}</h3>
                <p>
                  <span className="seller-shop-envelope">
                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                  </span>
                  {owner.email} <br />
                  Registered since: {owner.membership.registerDate}
                </p>
              </div>
            </div>
          </div>
          <div className="seller-shop-additional-info">
            <h2>Additional Information</h2>

            <div className="shop-additional-info-section">
              <div>
                <ul>
                  <li onClick={() => handleSectionClick("Items")}>Items</li>
                  <li onClick={() => handleSectionClick("Reviews")}>Reviews</li>
                  <li onClick={() => handleSectionClick("About")}>About</li>
                  <li onClick={() => handleSectionClick("ShopPolicies")}>
                    Shop Policies
                  </li>
                </ul>
              </div>
              <div className="rendered-sects">
                {/* Render sections based on selectedSection */}
                {selectedSection === "Items" && <ShopItems shopId={shopId} />}
                {/* Add rendering for other sections */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SellerShop;
