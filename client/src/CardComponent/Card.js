import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";
import useFetchImages from "../hooks/useFetchImages";
import "./Card.css";
import ShoppingCart from "../popups/CartPop.jsx";

const Card = (props) => {
  const navigate = useNavigate();
  const { _id, name, description, price, ratings, images } = props.product;
  const { addItem } = useShoppingCart();
  const imageUrl = useFetchImages(images);
  const cartItem = props.product;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  const handleMoreClick = () => {
    navigate(`/item/${_id}`);
  };

  const handleAddToCart = () => {
    addItem(cartItem);
    setItemAddedToCart(true); // Mark that the item has been added to the cart
  };

  useEffect(() => {
    let timeout;
    if (itemAddedToCart) {
      setIsCartOpen(true); // Open the cart after the item has been added to the cart
    }
    timeout = setTimeout(() => {
      setIsCartOpen(false);
      setItemAddedToCart(false); // Reset the flag
    }, 2000);
  }, [itemAddedToCart]);

  return (
    <div className="cardMain">
      {imageUrl[0] && <img src={imageUrl[0]} alt={name} />}
      <h2>{name}</h2>
      <h3>Price {price}</h3>
      <button className="feature-button" onClick={handleMoreClick}>
        More
      </button>
      <br></br>
      <button className="feature-button" onClick={handleAddToCart}>
        Add to cart
      </button>
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Card;
