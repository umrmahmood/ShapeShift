import React, { useState, useEffect } from 'react';
import '../styling/Cart.css';
import Payment from './Payment';
import lapTop from "../assets/laptop.jpg";
import emptyCart from "../assets/empty_cart.png";
import useShoppingCart from '../hooks/useShoppingCart';

const Cart = () => {

  // const [cartItems, setCartItems] = useState([]);
  const {addItem, subtractItem, removeItem, editItem, items: cartItems} = useShoppingCart();


  return (
    <div className="shopping-cart-outer">
      <div className="shopping-cart">
        <div className="items-list">
          {cartItems.length === 0 ? (
            <div className="no-items">
              <p>Your Cart is <span>Empty !</span></p>
              <img className="emptyCart" src={emptyCart} alt="laptop" />
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <>{console.log(" the item is ",item)}</>
                <img  src={lapTop} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p>{item.quantity}</p>
                  <div className="quantity-controls">
                    <div className="quantity-options">
                      <button className="delete-button" onClick={() => removeItem(item.id)}>Remove</button>
                      <label htmlFor={`quantity-${cartItems.quantity}`}></label>
                      {/* <select 
                        id={`quantity-${index}`}
                        className="quantity-select" 
                        value={item.quantity} 
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          const updatedItems = cartItems.map(cartItem => cartItem.name === item.name ? { ...cartItem, quantity: newQuantity, totalPrice: (parseFloat(cartItem.price.slice(1)) * newQuantity).toFixed(2) } : cartItem);
                          setCartItems(updatedItems);
                        }}
                      >
                        {[...Array(200)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select> */}
                    </div>
                    {/* <p>Total: €{item.totalPrice}</p> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          {/* <p>Total: €{getTotalCost()}</p> */}
        </div>
        <div className="cart-buttons">
          {/* <button className="delete-all-button" onClick={() => setCartItems([])}>Delete All</button> */}
        </div>
        {/* <button className="add-item" onClick={() => addItem({ name: 'Laptop', price: '€1000', image: 'https://via.placeholder.com/50' })}>Add Laptop</button>
        <button className="add-item" onClick={() => addItem({ name: 'Headphones', price: '€50', image: 'https://via.placeholder.com/50' })}>Add Headphones</button> */}
      </div>
      <Payment cartItems={cartItems} />
    </div>
  );
};

export default Cart;
