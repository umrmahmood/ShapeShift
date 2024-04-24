import React from 'react';
import './Payment.css';
import visa from "../assets/visa1.png"; 
import mastercard from "../assets/master-card.png";
import americanExpress from "../assets/american-express.png";
import paymentKlarna from "../assets/klarna1.png";
import payPal from "../assets/paypal.png";


const Payment = () => {
  return (
    <div className="payment-container">
      <h2>How you'll pay</h2>
      <div className="payment-options">
        <div className="payment-option">
          <input className="radio-box" type="radio" id="bank1" name="payment" value="bank1" />
          <label htmlFor="bank1">
            <img src={visa} alt="Visa" /> <img src={mastercard} alt="mastercard" /> <img src={americanExpress} alt="American-express" /> 
           
          </label>
        </div>
        <div className="payment-option-klarna">
          <input className="radio-box" type="radio" id="bank2" name="payment" value="bank2" />
          <label htmlFor="bank2">
          <img className="klrna-icon" src={paymentKlarna} alt="mastercard" />
           
          </label>
        </div>
        <div className="payment-option">
          <input className="radio-box" type="radio" id="bank3" name="payment" value="bank3" />
          <label htmlFor="bank3">
            <img className="paypal-icon" src={payPal} alt="Bank 3" />
           
          </label>
        </div>
      </div>
    </div>
  );
};

export default Payment;
