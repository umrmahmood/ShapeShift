import react, { useState, useEffect } from 'react';
import './Card.css';



const Card = (props) => {
    console.log(props.product);
    const { name, description, price, ratings, images } = props.product;
 
//Fetching data from db
    

    const calculateAverageRating = (rating) =>{
        if (!rating || rating.length === 0){
            return "No ratings yet"
        }
        
    }
    return(
         <div className="cardMain">
        {images && <img src={images[0]} alt={name} />}
            <h2>{name}</h2> 
            <p>{description}</p>
            <h3 className="rating">Rating:{calculateAverageRating(ratings)}</h3>
            <h3>Price {price}</h3> 
            <button className="feature-button">More</button> 
            
        </div>
    )
}

export default Card;