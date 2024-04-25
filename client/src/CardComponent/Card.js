import react, { useState } from 'react';
import placeholder from "./placeholder.jpg";
import './Card.css';



const Card = ({ product }) => {
    const { name, description, price, userRating } = product;
    return(
         <div className="cardMain">
            <img src={placeholder} alt="Placeholder" />
            <h2>{name}</h2>
            <p>{description}</p>
            <h3 className="rating">Rating:{userRating}</h3>
            <h3>Price {price}</h3>
            <button className="feature-button">More</button>
        </div>
    )
}

export default Card;