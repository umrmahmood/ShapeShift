import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./UserShop.css";
import UserShopSettings from "./UserShopSettings";
import ShopListing from "../components/ShopPage/ShopListing";
import UpdateShop from "../components/ShopPage/UpdateShop";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const useShopData = (shopId) => {
  const [shopData, setShopData] = useState({
    name: "",
    description: "",
    location: "",
    ownerId: "",
    shopBanner: "",
    shopAvatar: "",
  });

  useEffect(() => {
    const fetchShopData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/shop/${shopId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { name, description, location, owner, bannerUrl, avatarUrl } =
            response.data.shop;
          setShopData({
            name,
            description,
            location,
            ownerId: owner,
            shopBanner: bannerUrl,
            shopAvatar: avatarUrl,
          });
        } catch (error) {
          console.error("Error fetching shop data:", error);
        }
      }
    };
    if (shopId) fetchShopData();
  }, [shopId]);

  return shopData;
};

const useUserData = (ownerId) => {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    shopRegDate: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token && ownerId) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/users/profile/${ownerId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const username = response.data.user.profile.username;
          const email = response.data.user.email;
          const regDate =
            response.data.user.membership.registerDate.split("T")[0];
          setUserData({
            userName: username,
            userEmail: email,
            shopRegDate: regDate,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [ownerId]);

  return userData;
};

const UserShop = () => {
  const [selectedSection, setSelectedSection] = useState("Description");
  const navigate = useNavigate();
  const query = useQuery();
  const activeSection = query.get("active");
  const token = localStorage.getItem("shapeshiftkey");
  const decodedToken = token ? jwtDecode(token) : null;
  const shopId = decodedToken?.membership?.shopId;

  const { name, description, location, ownerId, shopBanner, shopAvatar } =
    useShopData(shopId);
  const { userName, userEmail, shopRegDate } = useUserData(ownerId);

  const [avatarFile, setAvatarFile] = useState(null);
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode(tokenFromLocalStorage);
      const userId = decodedToken.id;

      axios
        .get(`/api/users/profile/${userId}`)
        .then((response) => {
          const userPic = response.data.user.profile.avatarUrl;
          setAvatarFile(userPic); // corrected variable name
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    } else {
      console.log("Token not found in localStorage");
    }
  }, []);

  useEffect(() => {
    setSelectedSection(activeSection || "Listings");
  }, [activeSection]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    navigate(`/user-shop?active=${section}`);
  };

  return (
    <div className="user-shop-container">
      <div className="user-shop-banner-container">
        <img src={shopBanner} alt="Shop Banner" />
      </div>
      <div className="shop-info-container">
        <div className="user-shop-image-container">
          <div className="shop-image">
            <img src={shopAvatar} alt="Shop Avatar" />
          </div>
          <div className="shop-details">
            <h3>{name}</h3>
            <p>
              <span className="user-shop-location">
                <FontAwesomeIcon icon={faLocationDot} /> {location}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="user-shop-additional-info">
        <h2>Additional Information</h2>
        <div className="shop-additional-info-section">
          <ul>
            <li onClick={() => handleSectionClick("Description")}>
              Description
            </li>
            <li onClick={() => handleSectionClick("Listings")}>Listings</li>
            <li onClick={() => handleSectionClick("Orders")}>
              Orders & Shipping
            </li>
            <li onClick={() => handleSectionClick("UpdateImages")}>
              Update Images
            </li>
            <li onClick={() => handleSectionClick("UpdateShop")}>
              Update Shop
            </li>
          </ul>
          <div className="rendered-sects">
            {selectedSection === "UpdateImages" && (
              <UserShopSettings shopId={shopId} />
            )}
            {selectedSection === "Description" && <p>{description}</p>}
            {selectedSection === "Orders" && (
              <p>
                Order will be delivered within 24hrs after the confirmation.
              </p>
            )}
            {selectedSection === "Listings" && <ShopListing />}
            {selectedSection === "UpdateShop" && <UpdateShop shopId={shopId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShop;
