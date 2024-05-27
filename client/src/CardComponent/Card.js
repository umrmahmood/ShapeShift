import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useShoppingCart from '../hooks/useShoppingCart';
import useFetchImages from '../hooks/useFetchImages';
import './Card.css';

const Card = (props) => {
  const navigate = useNavigate();
  const { _id, name, description, price, ratings, images } = props.product;
  const { addItem, subtractItem, removeItem, editItem } = useShoppingCart();
  const imageUrl = useFetchImages(images);

  const [showNotification, setShowNotification] = useState(false);

  const handleMoreClick = () => {
    navigate(`/item/${_id}`);
  };

  const handleAddToCart = (product) => {
    addItem(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000); // Hide after 2 seconds
  };

  return (
    <div className="cardMain">
      {imageUrl[0] && <img src={imageUrl[0]} alt={name} />}
      <h2>{name}</h2>
      <h3>Price {price}</h3>
      <button className="feature-button" onClick={handleMoreClick}>
        More
      </button><br></br>
      <button className="feature-button" onClick={() => handleAddToCart(props.product)}>
        Add to cart
      </button>
      {/*<button className="feature-button" onClick={() => subtractItem(props.product._id)}>
        Subtract
  </button>*/}
      {/*<button className="feature-button" onClick={() => removeItem(props.product._id)}>
        Remove
      </button>*/}
      {/*<input
        type="number"
        id="editNumberOfItem"
        onChange={(e) => editItem(props.product._id, e.target.value)}
      />*/}
      {showNotification && (
        <div className="notification">
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default Card;
