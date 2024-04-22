import react, { useState } from 'react';
import './Card.css'
import Card from './Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from './Categories';

const UserSellCard =()=>{
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
export default UserSellCard;