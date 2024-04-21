


import React, { useState } from 'react';
import './App.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (name) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === name);

    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.name === name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      const updatedItems = cartItems.filter((cartItem) => cartItem.name !== name);
      setCartItems(updatedItems);
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="items-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="quantity-controls">
              <button className="remove-item" onClick={() => removeItem(item.name)}>-</button>
              <button className="add-item" onClick={() => addItem(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-item" onClick={() => addItem({ name: 'Laptop', price: '$1000', image: 'https://via.placeholder.com/50' })}>Add Laptop</button>
      <button className="add-item" onClick={() => addItem({ name: 'Headphones', price: '$50', image: 'https://via.placeholder.com/50' })}>Add Headphones</button>
    </div>
  );
};

export default Cart;

