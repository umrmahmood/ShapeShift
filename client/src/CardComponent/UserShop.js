import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./UserShop.css";
import usericon from "../assets/usericon.png";
import UserShopSettings from "./UserShopSettings";
import ShopListing from "../components/ShopPage/ShopListing";
import { useLocation, useNavigate } from "react-router-dom";

const UserShop = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shopRegDate, setShopRegDate] = useState("");
  const [shopId, setShopId] = useState(null);
  const [shopAvatar, setShopAvatar] = useState("");
  const [shopBanner, setShopBanner] = useState("");
  const [selectedSection, setSelectedSection] = useState("Description");

  // component change dor popup buttons
  const navigate = useNavigate();
  const { search } = useLocation();
  const active = React.useMemo(() => new URLSearchParams(search), [search]).get(
    "active"
  );

  useEffect(() => {
    if (active) setSelectedSection(active);
    else setSelectedSection("Listings");
  }, [active]);

  //getting shop info
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        const decodedToken = jwtDecode(token);
        const shopIdFromToken = decodedToken?.membership?.shopId;
        console.log("The shop id is:", shopIdFromToken);
        if (shopIdFromToken) {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/shop/${shopIdFromToken}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response);
            setName(response.data.shop.name);
            setDescription(response.data.shop.description);
            setLocation(response.data.shop.location);
            setOwnerId(response.data.shop.owner);
            setShopId(shopIdFromToken);
            setShopBanner(response.data.shop.bannerUrl);
            setShopAvatar(response.data.shop.avatarUrl);
          } catch (error) {
            console.error("Error fetching shop data:", error);
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/users/profile/${ownerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("the user side response is", response);
          setUserName(response.data.user.profile.username);
          setUserEmail(response.data.user.email);
          const registeredDate = response.data.user.membership.registerDate;
          const regDateFormated = registeredDate.split("T")[0];
          setShopRegDate(regDateFormated);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [ownerId]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    navigate("/user-shop?active=" + section);
  };

  return (
    <div className="user-shop-container">
      <div className="user-shop-banner-container">
        <img src={shopBanner} alt="shopBanner" />
      </div>
      <div className="shop-info-container">
        <div className="user-shop-image-container">
          <div className="shop-image">
            <img src={shopAvatar} alt="ShopAvatar" />
          </div>
          <div className="shop-details">
            <h3>{name}</h3>
            <p>
              <span className="user-shop-location">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
              </span>
              {location}
            </p>
          </div>
        </div>
        <div className="owner-shop">
          <div className="shop-image-owner">
            <img src={usericon} alt="Owner" />
          </div>
          <div className="shop-detail-owner">
            <h3>{userName}</h3>
            <p>
              <span className="user-shop-envelope">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
              </span>
              {userEmail} <br />
              Registerd since: {shopRegDate}
            </p>
          </div>
        </div>
      </div>
      <div className="user-shop-additional-info">
        <h2>Additional Information</h2>

        <div className="shop-additional-info-section">
          <div>
            <ul>
              <li onClick={() => handleSectionClick("Description")}>
                Description
              </li>
              <li onClick={() => handleSectionClick("Listings")}>Listings</li>
              <li onClick={() => handleSectionClick("Orders")}>
                Orders & Shipping
              </li>
              <li onClick={() => handleSectionClick("Settings")}>Settings</li>
            </ul>
          </div>
          <div className="rendered-sects">
            {selectedSection === "Settings" && (
              <UserShopSettings shopId={shopId} />
            )}
            {selectedSection === "Description" && <p>{description}</p>}
            {selectedSection === "Orders" && (
              <p>
                Order will be delivered within 24hrs after the confirmation.
              </p>
            )}
            {selectedSection === "Listings" && <ShopListing />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShop;
