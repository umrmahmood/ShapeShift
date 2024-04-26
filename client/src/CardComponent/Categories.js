import React from 'react';
import placeholder from "./placeholder.jpg";
import './categories.css';
import FilterCategories from './FilterCategories';

const Categories = () => {
    return (
        <div className="category">
        <ul className="category-grid">
            <li className="category-item">
                <a href="#" className="category-link">Home Decor</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">Tech Gadgets</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">Fashion & Apparel</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">Kitchen & Dining</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">Pet Accessories</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">DIY & Hobby</a>
            </li>
            <li className="category-item">
                <a href="#" className="category-link">Custom & Personalized</a>
            </li>
        </ul>
        <div className="filer-container">
<FilterCategories/>
        </div>
         </div>
        
    );
}


export default Categories;