import { useNavigate } from "react-router-dom";
import '../../styling/shopListing.css';

const ShopListing = () => {

    const Navigate = useNavigate();
    const onAddListing = () => {
        Navigate('/product-form')
    }
	return (
		<>
			<div className="shoplisting-container">
				<h2>Listings</h2>
				<div className="shoplisting-bar">
					<div className="shoplisting-btns">
						<button>Renew</button>
						<button>Deactivate</button>
						<button>Delete</button>
					</div>
					<div className="shoplisting-addlisting-btn">
						<button onClick={onAddListing}><span className="shoplist-plus">+</span> Add a listing</button>
					</div>
				</div>
                <div className="shoplisting-card-container">


                </div>
			</div>
		</>
	);
};

export default ShopListing;
