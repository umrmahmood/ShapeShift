// components/Payment.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VisaComponent from "./VisaComponent";
import KlarnaComponent from "./KlarnaComponent";
import "../Payment/Bank.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state?.payment !== "Bank1" &&
      location.state?.payment !== "Bank2"
    ) {
      window.open("https://www.paypal.com/signin", "_blank");
      navigate("/cart"); // Redirect to cart page after opening PayPal link
    }
  }, [location.state?.payment, navigate]);

  if (location.state?.payment === "Bank1") {
    return <VisaComponent />;
  }
  if (location.state?.payment === "Bank2") {
    return <KlarnaComponent />;
  }

  return null;
};

export default Payment;
