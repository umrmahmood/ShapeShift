import react, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  console.log(props.product);
  const { id, name, description, price, ratings, images } = props.product;
 
  const handleMoreClick = () => {
    navigate(`/item/${id}`);
  };
  
  // const calculateAverageRating = (rating) => {
  //   if (!rating || rating.length === 0) {
  //     return "No ratings yet";
  //   }
  // };
  return (
    <div className="cardMain">
      {images && <img src={images[0]} alt={name} />}
      <h2>{name}</h2>
      <p>{description}</p>
      {/* <h3 className="rating">Rating:{calculateAverageRating(ratings)}</h3> */}
      <h3>Price {price}</h3>
      <button className="feature-button" onClick={handleMoreClick}>More</button> 
    </div>
  );
};

export default Card;
