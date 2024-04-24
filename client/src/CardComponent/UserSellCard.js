import React, { useState, useEffect } from 'react';
import './Card.css'
import Card from './Card';
import Categories from './Categories';

const MainPage =()=>{

return(
    <div className="main-layout">
<Categories/>
<div className="item-container">
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
</div>
    </div>
)
    
}
export default MainPage;