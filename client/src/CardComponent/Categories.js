import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from "./placeholder.jpg";

const Categories  = () =>{
    return(
        <ul className="category-grid">
            <li><Link to="">Home Decor</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
            <li><Link to="">Tech Gadgets</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
            <li>
            <Link to="">Fashion & Apparel</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
            <li><Link to="">Kitchen & Dining</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
            <li><Link to="">Pet Accessories</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
            <li><Link to="">DIY & Hobby</Link>
            <img src={placeholder} alt="Placeholder" style={{width: '50px', height: '50px' }} /></li>
            <li><Link to="">Custom & Personalized</Link>
            <img src={placeholder} alt="Placeholder" style={{ width: '50px', height: '50px' }} /></li>
        </ul>
    )
}

export default Categories;