import React from 'react';
import '../styling/Cart.css';
import Payment from './Payment';
import lapTop from "../assets/laptop.jpg";
import emptyCart from "../assets/empty_cart.png";
import useShoppingCart from '../hooks/useShoppingCart';

const Cart = () => {
  const { addItem, subtractItem, removeItem, editItem, items: cartItems } = useShoppingCart();

  return (
    <div className="shopping-cart-outer">
      <div className="shopping-cart">
        <div className="items-list">
          {cartItems.length === 0 ? (
            <div className="no-items">
              <p>Your Cart is <span>Empty !</span></p>
              <img className="emptyCart" src={emptyCart} alt="empty cart" />
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={lapTop} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <h5>Price {item.price * item.quantity}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <div className="quantity-controls">
                    <div className="quantity-options">
                      <button className="delete-button" onClick={() => removeItem(item.id)}>Remove</button>
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
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
      <Payment cartItems={cartItems} />
    </div>
  );
};

export default Cart;
