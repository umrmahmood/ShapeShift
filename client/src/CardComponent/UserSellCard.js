import React, { useState, useEffect } from 'react';
import './Card.css'
import Card from './Card';
import Categories from './Categories';

const MainPage =()=>{
    const cardInfo = [
        { id: 1, title: 'Card 1', description: 'Description for Card 1' },
        { id: 2, title: 'Card 2', description: 'Description for Card 2' },
        { id: 3, title: 'Card 3', description: 'Description for Card 3' },
        { id: 4, title: 'Card 4', description: 'Description for Card 4' },
        // { id: 5, title: 'Card 5', description: 'Description for Card 5' }
    ];
return(
    <div className="main-layout">
<Categories/>
<div className="item-container">
    {cardInfo.map(card =>(
        <Card 
    key={card.id}
    title={card.title}
    description={card.description}
    />
    ))}
</div>
    </div>
)
}
export default MainPage;