import React, { useState, useEffect } from 'react';
import './Cart.css';
import Payment from './Payment';

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: (parseFloat(cartItem.price.slice(1)) * (cartItem.quantity + 1)).toFixed(2) } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, totalPrice: item.price.slice(1) }]);
    }
  };

  const removeItem = (name) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === name);

    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.name === name ? { ...cartItem, quantity: cartItem.quantity - 1, totalPrice: (parseFloat(cartItem.price.slice(1)) * (cartItem.quantity - 1)).toFixed(2) } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      const updatedItems = cartItems.filter((cartItem) => cartItem.name !== name);
      setCartItems(updatedItems);
    }
  };

  // const getTotalCost = () => {
  //   return cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0).toFixed(2);
  // };

  return (
    <div className="shopping-cart-outer">
      <div className="shopping-cart">
        <div className="items-list">
          {cartItems.length === 0 ? (
            <div className="no-items">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p>{item.price}</p>
                  <div className="quantity-controls">
                    <div className="quantity-options">
                      <button className="delete-button" onClick={() => removeItem(item.name)}>Delete</button>
                      <label htmlFor={`quantity-${index}`}>Qty:</label>
                      <select 
                        id={`quantity-${index}`}
                        className="quantity-select" 
                        value={item.quantity} 
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          const updatedItems = cartItems.map(cartItem => cartItem.name === item.name ? { ...cartItem, quantity: newQuantity, totalPrice: (parseFloat(cartItem.price.slice(1)) * newQuantity).toFixed(2) } : cartItem);
                          setCartItems(updatedItems);
                        }}
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
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
        <button className="add-item" onClick={() => addItem({ name: 'Laptop', price: '€1000', image: 'https://via.placeholder.com/50' })}>Add Laptop</button>
        <button className="add-item" onClick={() => addItem({ name: 'Headphones', price: '€50', image: 'https://via.placeholder.com/50' })}>Add Headphones</button>
      </div>
      <Payment cartItems={cartItems} />
    </div>
  );
};

export default Cart;
