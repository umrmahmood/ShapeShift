import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faEarth,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBell,
  // faSearch,
} from "@fortawesome/free-regular-svg-icons";
import PopoverMenu from "./PopMenu.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SSlogo.png";
import "../styling/navbar.css";

const Navbar = ({ onLoginClick }) => {
  // Popper
  const [isMyProfilePopOpen, setIsMyProfilePopOpen] = useState(false);
  const [isCartPopOpen, setIsCartPopOpen] = useState(false);
  const [isLanguagePopOpen, setIsLanguagePopOpen] = useState(false);
  const [isShopPopOpen, setIsShopPopOpen] = useState(false);
  const [isNotificationPopOpen, setIsNotificationPopOpen] = useState(false);
  const [isProfileInfoPopOpen, setIsProfileInfoPopOpen] = useState(false);

  const myProfilePopRef = useRef(null);
  const cartPopRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

  let haveShop = false;

  if (tokenFromLocalStorage) {
    const decodedToken = jwtDecode(tokenFromLocalStorage);

    // Access the payload to see if the member has a shop
    haveShop = decodedToken.membership.haveShop;
  } else {
    console.log("Token not found in localStorage");
  }

  const onSellClick = () => {
    if (haveShop) {
      navigate("/product-form");
    } else {
      navigate("/openshop");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("shapeshiftkey");
    setIsLoggedIn(!!token);
  }, [tokenFromLocalStorage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShoppingBagClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myProfilePopRef.current &&
        !myProfilePopRef.current.contains(event.target) &&
        isMyProfilePopOpen
      ) {
        setIsMyProfilePopOpen(false);
      }
      if (
        cartPopRef.current &&
        !cartPopRef.current.contains(event.target) &&
        isCartPopOpen
      ) {
        setIsCartPopOpen(false);
      }
      // Add similar conditions for other popover menus
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isMyProfilePopOpen, isCartPopOpen]);
  // Add dependencies for other popover menus if needed

  const togglePopover = (popoverType) => {
    switch (popoverType) {
      case "myProfilePop":
        setIsMyProfilePopOpen(!isMyProfilePopOpen);
        break;
      case "cartPop":
        setIsCartPopOpen(!isCartPopOpen);
        break;
      case "languagePop":
        setIsLanguagePopOpen(!isLanguagePopOpen);
        break;
      case "shopPop":
        setIsShopPopOpen(!isShopPopOpen);
        break;
      case "notificationPop":
        setIsNotificationPopOpen(!isNotificationPopOpen);
        break;
      case "profileInfoPop":
        setIsProfileInfoPopOpen(!isProfileInfoPopOpen);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="Navbar-container">
        <div className="nav-logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="nav-search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search for anything"
          />
        </div>

        <div className="nav-icons">
          <li className="navbar-login-btn">
            <button
              onClick={onLoginClick}
              style={{ border: isLoggedIn ? "none" : "1px solid black" }}
            >
              {isLoggedIn ? "" : "Login"}
            </button>
          </li>

          {isLoggedIn && (
            <>
              <div className="navbar-conditional-icon">
                <div className="navbar-login-btn nav-sell-btn">
                  <button onClick={onSellClick}>Sell</button>
                </div>
                <li>
                  <button onClick={() => togglePopover("notificationPop")}>
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                </li>
                <li>
                  <button onClick={() => togglePopover("myProfilePop")}>
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </li>
                {haveShop ? (
                  <li>
                    <button onClick={() => togglePopover("shopPop")}>
                      <FontAwesomeIcon icon={faShop} />
                    </button>
                  </li>
                ) : (
                  ""
                )}
              </div>
            </>
          )}

          <button onClick={() => togglePopover("cartPop")}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </button>
          <li>
            <button onClick={() => togglePopover("languagePop")}>
              <FontAwesomeIcon icon={faEarth} />
            </button>
          </li>
        </div>
        <div ref={myProfilePopRef}>
          {" "}
          <PopoverMenu menuType="myProfilePop" isOpen={isMyProfilePopOpen} />
        </div>
        <div ref={cartPopRef}>
          {" "}
          <PopoverMenu menuType="cartPop" isOpen={isCartPopOpen} />
        </div>
        <PopoverMenu menuType="languagePop" isOpen={isLanguagePopOpen} />
        <PopoverMenu menuType="shopPop" isOpen={isShopPopOpen} />
        <PopoverMenu
          menuType="notificationPop"
          isOpen={isNotificationPopOpen}
        />
      </div>
    </>
  );
};

export default Navbar;
