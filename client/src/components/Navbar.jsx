// React and related imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Nav Icon Popup's
import MyProfile from "../popups/MyProfile.jsx";
import MyShop from "../popups/MyShop.jsx";
import ShoppingCart from "../popups/CartPop.jsx";

// Component-specific imports
import logo from "../assets/SSlogo.png";
import smallLogo from "../assets/SSlogo-small.png";

// Font Awesome icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faShop } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

// CSS import
import "../styling/navbar.css";

const Navbar = ({ onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Popup states
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isMyShopOpen, setIsMyShopOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigate = useNavigate();

  //handling scroll
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

  let haveShop = false;

  if (tokenFromLocalStorage) {
    const decodedToken = jwtDecode(tokenFromLocalStorage);

    // Access the payload to see if the member has a shop
    haveShop = decodedToken.membership.haveShop;
  } else {
    // console.log("Token not found in localStorage");
  }

  const onSellClick = () => {
    if (haveShop) {
      navigate("/product-form");
    } else {
      navigate("/openshop");
    }
  };

  // PopUp logic
  const toggleMyProfile = () => {
    setIsMyProfileOpen((prev) => !prev); // Toggles the state of isMyProfileOpen
  };
  const toggleMyShop = () => {
    setIsMyShopOpen((prev) => !prev); // Toggles the state of isMyProfileOpen
  };
  const toggleLanguage = () => {
    setIsLanguageOpen((prev) => !prev); // Toggles the state of isMyProfileOpen
  };
  const toggleShoppingCart = () => {
    setIsShoppingCartOpen((prev) => !prev); // Toggles the state of isMyProfileOpen
  };
  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev); // Toggles the state of isMyProfileOpen
  };

  useEffect(() => {
    const token = localStorage.getItem("shapeshiftkey");
    setIsLoggedIn(!!token);
  }, [tokenFromLocalStorage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <>
      <div className={`Navbar-container ${isScrolled ? "small" : ""}`}>
        {/* <div className="nav-logo">
					<a href="/">
          <img src={isScrolled ? smallLogo : logo} alt="Logo"/>
					</a>
				</div> */}
        <div className="nav-logo">
          <a href="/">
            <img
              src={logo}
              alt="Large Logo"
              className={`logo-img ${isScrolled ? "hidden" : "visible"}`}
            />
          </a>

          <a href="/">
            <img
              src={smallLogo}
              alt="Small Logo"
              className={`logo-img ${isScrolled ? "visible" : "hidden"}`}
            />
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

        {/* responsive menu
				<div className="menu-toggle">
                    <button onClick={toggleMenu}>☰</button>
                </div>

                <div className={`nav-icons ${isMenuOpen ? "show" : ""}`}> */}
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
                {/* <div className="navbar-login-btn nav-sell-btn"> */}
                <div className="navbar-sell-btn nav-sell-btn">
                  <button onClick={onSellClick}>Sell</button>
                </div>
                <li>
                  <div
                    className="profile-icon icon-pointer"
                    onClick={toggleMyProfile}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <MyProfile
                    isOpen={isMyProfileOpen}
                    onClose={toggleMyProfile}
                  />
                </li>

                {haveShop ? (
                  <li>
                    <div
                      className="shop-icon icon-pointer"
                      onClick={toggleMyShop}
                    >
                      <FontAwesomeIcon icon={faShop} />
                    </div>
                    <MyShop isOpen={isMyShopOpen} onClose={toggleMyShop} />
                  </li>
                ) : (
                  ""
                )}
              </div>
            </>
          )}

          <li>
            <div
              className="shopping-icon icon-pointer"
              onClick={toggleShoppingCart}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <ShoppingCart
              isOpen={isShoppingCartOpen}
              onClose={toggleShoppingCart}
            />
          </li>
        </div>
      </div>
    </>
  );
};

export default Navbar;
