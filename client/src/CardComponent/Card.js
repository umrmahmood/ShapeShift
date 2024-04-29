import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';



const Card = ({ product }) => {
    const { name, description, price, ratings } = product;
    const [products, setProducts] = useState([]);
 
//Fetching data from db
    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, []);     

    const calculateAverageRating = (rating) =>{
        if (!rating || rating.length === 0){
            return "No ratings yet"
        }
        
    }
    return(
         <div className="cardMain">
            <img src={product.images[0]} alt={name} />

            <h2>{name}</h2>
            <p>{description}</p>
            <h3 className="rating">Rating:{calculateAverageRating(ratings)}</h3>
            <h3>Price {price}</h3> 
            <button className="feature-button">More</button>
        </div>
    )
}

export default Card;