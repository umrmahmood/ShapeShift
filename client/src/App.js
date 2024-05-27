// App.js

import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ItemPage from "./CardComponent/ItemPage";
import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";
import OpenShop from "./components/openShop/OpenShop.jsx";
import Login from "../src/components/loginandSignup/Login.jsx";
import ProductForm from "./components/productReg/ProductForm";
import UserShop from "./CardComponent/UserShop";
import SellerShop from "./components/SellerShop.jsx";
import MainPage from "./CardComponent/MainPage";
import Cart from "./components/Cart.jsx";
import ShopListing from "./components/ShopPage/ShopListing.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import MessagePage from "./components/chat/MessagePage.jsx";
import KlarnaComponent from "./components/Payment/KlarnaComponent.jsx";
import PayPalComponent from "./components/Payment/PayPalComponent.jsx";
import VisaComponent from "./components/Payment/VisaComponent.jsx";
import Payment from "./components/Payment/index.jsx";
import DigitalItemPage from "./components/digitals/SingleDigital.jsx";
import DigitalListings from "./components/digitals/DigitalListings.jsx";
import SearchResultPage from "./components/SearchResultPage.jsx";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <Navbar onLoginClick={toggleLogin} />
          {showLogin && (
            <div className="main-overlay" onClick={toggleLogin}></div>
          )}
          {showLogin && (
            <div className="login-popup">
              <Login toggleLogin={toggleLogin} />
            </div>
          )}
        </header>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/config" element={<ConfigComponent />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/shop/:shopId" element={<SellerShop />} />
          <Route path="/user-shop" element={<UserShop />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/item/:productId" element={<ItemPage />} />
          <Route path="/digital/:productId" element={<DigitalItemPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/shoplisting" element={<ShopListing />} />
          <Route path="/openshop" element={<OpenShop />} />
          <Route path="/product-form" element={<ProductForm />} />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/messages" element={<MessagePage />} />
          {/* <Route path="/payment/visa" element={<VisaComponent />} />
          <Route path="/payment/klarna" element={<KlarnaComponent />} />
          <Route path="/payment/paypal" element={<PayPalComponent />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/digital/" element={<DigitalListings />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}
export default App;
