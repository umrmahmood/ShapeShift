import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styling/Payment.css";
import visa from "../assets/visa1.png"; 
import mastercard from "../assets/master-card.png";
import americanExpress from "../assets/american-express.png";
import paymentKlarna from "../assets/klarna1.png";
import payPal from "../assets/paypal.png";
import useShoppingCart from '../hooks/useShoppingCart';

const Payment = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const getItemTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  const getShippingCost = () => {
    return '10.00'; // €10.00 as an example
  };

  const getTax = () => {
    const itemTotal = parseFloat(getItemTotal());
    const shippingCost = parseFloat(getShippingCost());
    const tax = (itemTotal + shippingCost) * 0.2; // 20% tax as an example
    return tax.toFixed(2);
  };

  const getTotalPrice = () => {
    const itemTotal = parseFloat(getItemTotal());
    const shippingCost = parseFloat(getShippingCost());
    const tax = parseFloat(getTax());
    return (itemTotal + shippingCost + tax).toFixed(2);
  };

  const proceedHandler = () => {
    console.log(paymentMethod);
    navigate('/payment', {state:{payment: paymentMethod}});
  };

  return (
    <div className="payment-container">
      <h2 className="payment-head">How will you pay</h2>
      <div className="payment-options">
        <div className="payment-option">
          <input
            className="radio-box"
            type="radio"
            id="bank1"
            name="payment"
            value="bank1"
            onClick={() => setPaymentMethod("Bank1")}
          />
          <label htmlFor="bank1">
            <img src={visa} alt="Visa" /> <img src={mastercard} alt="Mastercard" /> <img src={americanExpress} alt="American Express" />
          </label>
        </div>
        <div className="payment-option-klarna">
          <input
            className="radio-box"
            type="radio"
            id="bank2"
            name="payment"
            value="bank2"
            onClick={() => setPaymentMethod("Bank2")}
          />
          <label htmlFor="bank2">
            <img className="klrna-icon" src={paymentKlarna} alt="Klarna" />
          </label>
        </div>
        <div className="payment-option">
          <input
            className="radio-box"
            type="radio"
            id="bank3"
            name="payment"
            value="bank3"
            onClick={() => setPaymentMethod("Bank3")}
          />
          <label htmlFor="bank3">
            <img className="paypal-icon" src={payPal} alt="PayPal" />
          </label>
        </div>
      </div>

      <div className="payment-details">
        <p>Item Total: <span className="price">€  {getItemTotal()}</span></p>
        <p>Shipping Cost: <span className="price">€  {getShippingCost()}</span></p>
        <p>Tax (20%): <span className="price">€  {getTax()}</span></p>
        <hr />
        <div className="sub-total">
        <p >Sub Total ({cartItems.length} items): <span className="total-price">€  {getTotalPrice()}</span></p>
        </div>
        <button
          className="proceed-button"
          disabled={!paymentMethod}
          onClick={proceedHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Payment;
