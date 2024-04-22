import React from 'react';
import placeholder from "./placeholder.jpg";

const Categories  = () =>{
    return(
        <ul className="category-grid">
        <li>
            <a href="#">Home Decor</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">Tech Gadgets</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">Fashion & Apparel</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">Kitchen & Dining</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">Pet Accessories</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">DIY & Hobby</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
        <li>
            <a href="#">Custom & Personalized</a>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} />
        </li>
    </ul>
    
    )
}

export default Categories;