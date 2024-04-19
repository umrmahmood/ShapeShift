// EmptyCart.jsx
import React from 'react';

const Cart = ({ onClose }) => {
    return (
        <div className="empty-cart-container">
            <h2>Your Cart is Empty</h2>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Cart;
