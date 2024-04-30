import React, { useState, useEffect } from 'react';
import './Card.css'
import Card from './Card';
import Categories from './Categories';
import TopButton from './TopButton';
import axios from 'axios';

const MainPage =()=>{
    const cardInfo = [
        { id: 1, title: 'Card 1', description: 'Description for Card 1' },
        { id: 2, title: 'Card 2', description: 'Description for Card 2' },
        { id: 3, title: 'Card 3', description: 'Description for Card 3' },
        { id: 4, title: 'Card 4', description: 'Description for Card 4' },
        // { id: 5, title: 'Card 5', description: 'Description for Card 5' }
    ];

    const [products, setProducts] = useState([]);
 
    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                // console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, []);     
return(
    <div className="main-layout">
<Categories/>
 {products && <div className="item-container">
    {products.map((product, index) =>(
        <Card 
        product={product}
    key={product.id + "_" + index}

    />
    ))}
</div>}
<TopButton/>
    </div>
)
}
export default MainPage;