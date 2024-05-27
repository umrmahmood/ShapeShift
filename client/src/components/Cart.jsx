// src/components/Cart.js
import React from 'react';
import '../styling/Cart.css';
import PaymentBlock from './PaymentBlock';
import emptyCart from '../assets/empty_cart.png';
import useShoppingCart from '../hooks/useShoppingCart';
import useFetchImages from '../hooks/useFetchImages';

const Cart = () => {
  const { addItem, subtractItem, removeItem, editItem, items: cartItems } = useShoppingCart();
  const imageUrls = useFetchImages(cartItems.map(item => item.images[0])); // Assuming each cart item has an images array

  return (
    <div className="shopping-cart-outer">
      <div className="shopping-cart">
        <div className="items-list">
          {cartItems.length === 0 ? (
            <div className="no-items">
              <p>Your Cart is <span>Empty!</span></p>
              <img className="emptyCart" src={emptyCart} alt="empty cart" />
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={imageUrls[index] || emptyCart}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  {/*<p>Quantity: {item.quantity}</p>*/}
                  <h5 className="item-price">Price € {(item.price * item.quantity).toFixed(2)}</h5>
                  <div className="quantity-controls">
                    <div className="quantity-options">
                      <button className="delete-button" onClick={() => removeItem(item.id)}>Remove</button>
                      <label className='quantity-options-txt' htmlFor={`quantity-${index}`}>Qty:</label>
                      <select
                        id={`quantity-${index}`}
                        className="quantity-select"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          editItem(item.id, newQuantity);
                        }}
                      >
                        {[...Array(200)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          {/* Calculate and display total cost if needed */}
        </div>
        <div className="cart-buttons">
          {/* Add any additional buttons if needed */}
        </div>
      </div>
      <PaymentBlock cartItems={cartItems} />
    </div>
  );
};

export default Cart;
