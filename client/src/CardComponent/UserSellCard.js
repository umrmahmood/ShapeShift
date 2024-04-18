import react, { useState } from 'react';
import './Card.css'
import Card from './Card';
import SearchBar from './SearchBar';
// import Navbar from './components/Navbar'

const MainPage =()=>{
    const searchData = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
return(
    <div className="main-layout">
{/* <Navbar/>    */}
<SearchBar data={searchData}/>
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