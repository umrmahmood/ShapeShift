import react, { useState } from 'react';
import placeholder from "./placeholder.jpg";



const Card = () => {
let price = 0;
let userRaiting = false;
let description = "lorem ipsum dolor sit amet, consectet";
    return(
         <div className="cardMain">
            <img src={placeholder} alt="Placeholder" style={{ width: '300px', height: '300px' }} />
            <p>{description}</p>
            <h3 className="rating">Rating:{userRaiting}</h3>
            <h3>Price {price}</h3>
        <div className="card"></div>
        </div>
    )
}

export default Card;