import placeholder from "./placeholder.jpg";
import description from './Card';
import price from './Card';
import itemName from './Card';
import './Item.css'


<script src="https://kit.fontawesome.com/18c16054bb.js" crossorigin="anonymous"></script>


const ItemPage =() =>{
    return(
<div className="MainContainer">
    <div className="ProductContainer">
<div className="ProductDescription">
    <div className="ProductImage">
    <img className="item-main" src={placeholder} alt="Placeholder" />
            <div className="secondary-images">
                <img src={placeholder} alt="Placeholder" />
                <img src={placeholder} alt="Placeholder" />
                <img src={placeholder} alt="Placeholder" />
            </div>
    </div>
    <div className="ProductInfo">
                        <h2>{itemName}</h2>
                        <p>{description}</p>
                        <h3>Price {price}</h3>
                    </div>
            {/* <button onClick={addToCart}>Add to Cart</button>
            <button onClick={liked}><i class="fa-regular fa-heart"></i></button>
            <button onClick={}>To cart</button> */}
</div>
<div className="ProductSpecial"></div>
    </div>
    <div className="options">
    <img src={placeholder} alt="Placeholder"/>
    </div>

</div>
    )


}
export default ItemPage;