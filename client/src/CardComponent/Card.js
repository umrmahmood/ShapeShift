import react, { useState } from 'react';
import placeholder from "./placeholder.jpg";
import './Card.css';



const Card = () => {
let price = 0;
let userRaiting = false;
let description = "lorem ipsum dolor sit amet, consectet";
let itemName = "card";
    return(
         <div className="cardMain">
            <img src={placeholder} alt="Placeholder" />
            <h2>{itemName}</h2>
            <p>{description}</p>
            <h3 className="rating">Rating:{userRaiting}</h3>
            <h3>Price {price}</h3>
            <button className="feature-button">More</button>
        </div>
    )
}

export default Card;