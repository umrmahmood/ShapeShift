import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/shopListing.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const ShopListing = () => {
// 	const Navigate = useNavigate();

// 	const [listings, setListings] = useState([]);
// 	const [productImage, setProductImage] = useState("");

// 	useEffect(() => {
// 		const fetchListings = async () => {
// 			const token = localStorage.getItem("shapeshiftkey");
// 			if (token) {
// 				const decodedToken = jwtDecode(token);
// 				const shopIdFromToken = decodedToken?.membership?.shopId;
// 				try {
// 					const response = await axios.get(
// 						`http://localhost:5001/api/products/listings/${shopIdFromToken}`
// 					);
// 					setListings(response.data);
// 					console.log("The listing contains", response.data);
// 				} catch (error) {
// 					console.error("Error fetching listings:", error);
// 				}
// 			}
// 		};
// 		fetchListings();
// 	}, []);

// 	const onAddListing = () => {
// 		Navigate("/product-form");
// 	};

// 	return (
// 		<>
// 			<div className="shoplisting-container">
// 				<h2>Listings</h2>
// 				<div className="shoplisting-bar">
// 					<div className="shoplisting-btns">
// 						<button>Renew</button>
// 						<button>Deactivate</button>
// 						<button>Delete</button>
// 					</div>
// 					<div className="shoplisting-addlisting-btn">
// 						<button onClick={onAddListing}>
// 							<span className="shoplist-plus">+</span> Add a listing
// 						</button>
// 					</div>
// 				</div>
// 				<div className="shoplisting-card-container">
// 					{listings.map((listing) => (
// 						<div key={listing._id} className="shoplisting-card">
// 							<img src={productImage} alt="" />
// 							<h3>{listing.name}</h3>
// 							<p>{listing.description}</p>
// 							<p>
// 								Price: {listing.price} {listing.currency}
// 							</p>
// 							<p>Material: {listing.material.join(", ")}</p>
// 							<div className="shoplisting-btns">
// 								<button>Edit</button>
// 								<button>Delete</button>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default ShopListing;


// const ShopListing = () => {
//     const Navigate = useNavigate();

//     const [listings, setListings] = useState([]);
// 	const [imageId, setImageId] = useState([]);
// 	const [productImage, setProductImage] = useState('');
	

//     useEffect(() => {
//         const fetchListings = async () => {
//             const token = localStorage.getItem("shapeshiftkey");
//             if (token) {
//                 const decodedToken = jwtDecode(token);
//                 const shopIdFromToken = decodedToken?.membership?.shopId;
//                 try {
//                     const response = await axios.get(
//                         `http://localhost:5001/api/products/listings/${shopIdFromToken}`
//                     );
//                     setListings(response.data);
// 					setImageId(response.data[0].images[0])
//                     console.log("The listing contains", response.data);
//                 } catch (error) {
//                     console.error("Error fetching listings:", error);
//                 }
				
//             }
			
//         };
//         fetchListings();
		
//     }, []);

// 	console.log("The image id is", imageId)
	

// 	//get the image object

// 	// useEffect(() => {
//     //     const fetchListings = async () => {
//     //         // const token = localStorage.getItem("shapeshiftkey");
//     //         // if (token) {
//     //         //     const decodedToken = jwtDecode(token);
//     //         //     const shopIdFromToken = decodedToken?.membership?.shopId;
//     //             try {
//     //                 const response = await axios.get(
//     //                     `http://localhost:5001/api/images/${listings[0].images[0]}`
//     //                 );
//     //                 setProductImage(response.data);
//     //                 // console.log("The listing contains", response.data);
//     //             } catch (error) {
//     //                 console.error("Error fetching image:", error);
//     //             }
//     //         }
//     //     };
//     //     fetchListings();
//     // }, []);


// 	useEffect(() => {
// 		const fetchListings = async () => {
// 			try {
// 				const response = await axios.get(

// 					`http://localhost:5001/api/images/${imageId}}`
// 				);
// 				console.log('The new ',response.data);
// 				setProductImage(response.data);
// 				// console.log("The listing contains", response.data);
// 			} catch (error) {
// 				console.error("Error fetching image:", error);
// 			}
// 		};
// 		fetchListings();
// 	}, [imageId]); 
	
// 	console.log('The product image is',productImage);

//     const onAddListing = () => {
//         Navigate("/product-form");
//     };

const ShopListing = () => {
    const Navigate = useNavigate();

    const [listings, setListings] = useState([]);
    const [imageId, setImageId] = useState(null); // Initialize as null
    const [productImage, setProductImage] = useState('');

    useEffect(() => {
        const fetchListings = async () => {
            const token = localStorage.getItem("shapeshiftkey");
            if (token) {
                const decodedToken = jwtDecode(token);
                const shopIdFromToken = decodedToken?.membership?.shopId;
                try {
                    const response = await axios.get(
                        `http://localhost:5001/api/products/listings/${shopIdFromToken}`
                    );
                    setListings(response.data);
                    setImageId(response.data[0].images[0]); // Set the imageId
                    console.log("The listing contains", response.data);
                } catch (error) {
                    console.error("Error fetching listings:", error);
                } 
            }
        };
        fetchListings();
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            if (imageId !== null) { // Check if imageId is set
                try {
                    const response = await axios.get(
                        `http://localhost:5001/api/images/${imageId}`
                    );
                    console.log('The new image:', response.data);
                    setProductImage(response.data.url);
                } catch (error) {
                    console.error("Error fetching image:", error);
                }
            }
        };
        fetchImage();
    }, [imageId]); // Add imageId as a dependency

    console.log('The product image is', productImage);

    const onAddListing = () => {
        Navigate("/product-form");
    };
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
                        <button onClick={onAddListing}>
                            <span className="shoplist-plus">+</span> Add a listing
                        </button>
                    </div>
                </div>
                <div className="shoplisting-card-container">
                    {listings.map((listing) => (
                        <div key={listing._id} className="shoplisting-card">
                            <img src={productImage} alt="" />
                            <h3>{listing.name}</h3>
                            <p>{listing.description}</p>
                            <p>
                                Price: {listing.price} {listing.currency}
                            </p>
                            <p>Material: {listing.material.join(", ")}</p>
                            <div className="shoplisting-btns">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShopListing;
// const ShopListing = () => {
//     const Navigate = useNavigate();
//     const [listings, setListings] = useState([]);

//     useEffect(() => {
//         const fetchListings = async () => {
//             const token = localStorage.getItem("shapeshiftkey");
//             if (token) {
//                 const decodedToken = jwtDecode(token);
//                 const shopIdFromToken = decodedToken?.membership?.shopId;
//                 try {
//                     const response = await axios.get(
//                         `http://localhost:5001/api/products/listings/${shopIdFromToken}`
//                     );
//                     setListings(response.data);
//                     console.log("The listing contains", response.data);
//                 } catch (error) {
//                     console.error("Error fetching listings:", error);
//                 }
//             }
//         };
//         fetchListings();
//     }, []);

//     const onAddListing = () => {
//         Navigate("/product-form");
//     };

//     return (
//         <>
//             <div className="shoplisting-container">
//                 <h2>Listings</h2>
//                 <div className="shoplisting-bar">
//                     <div className="shoplisting-btns">
//                         <button>Renew</button>
//                         <button>Deactivate</button>
//                         <button>Delete</button>
//                     </div>
//                     <div className="shoplisting-addlisting-btn">
//                         <button onClick={onAddListing}>
//                             <span className="shoplist-plus">+</span> Add a listing
//                         </button>
//                     </div>
//                 </div>
//                 <div className="shoplisting-card-container">
//                     {listings.map((listing) => (
//                         <div key={listing._id} className="shoplisting-card">
//                             {/* Fetch image for each listing */}
//                             {listing.images.length > 0 ? (
//                                 <img src={`http://localhost:5001/api/images/${listing.images[0]}`} alt="" />
//                             ) : (
//                                 <div>No Image Available</div>
//                             )}
//                             <h3>{listing.name}</h3>
//                             <p>{listing.description}</p>
//                             <p>
//                                 Price: {listing.price} {listing.currency}
//                             </p>
//                             <p>Material: {listing.material.join(", ")}</p>
//                             <div className="shoplisting-btns">
//                                 <button>Edit</button>
//                                 <button>Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ShopListing;
