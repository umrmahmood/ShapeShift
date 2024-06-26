// import React, { useState, useEffect } from "react";
// import "./Card.css";
// import Card from "./Card";
// import Categories from "./Categories";
// import TopButton from "./TopButton";
// import axios from "axios";
// import placeholder from "./placeholder.jpg";
// import { useNavigate } from "react-router-dom";


// const MainPage = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     axios
//       .get("/api/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//       });
//   }, []);

//   const handleMoreClick =(_id) => {
//     navigate(`/item/${_id}`);
// };

// const renderCardBlock = (startIndex) => {
//     return (
//         <div className="card-block">
//             {products.slice(startIndex, startIndex + 4).map((product) => (
//           <Card
//             key={product._id}
//             product={product}
//             onMoreClick={() => handleMoreClick(product._id)} 
//             />
//             ))}
//         </div>
//     )
// }
//   return (
//     <div className="main-layout">
//       <Categories />
//       {renderCardBlock(4)}
//       <div className="banner-section">
//         <div className="banner-left">
//           <img
//             src={placeholder}
//             alt="name"
//             style={{ height: "200px", width: "300px" }}
//           />
//         </div>
//         <div className="banner-right">
//           <img
//             src={placeholder}
//             alt="name"
//             style={{ height: "200px", width: "300px" }}
//           />
//         </div>
//       </div>
//       {renderCardBlock(8)}

//       {/* {products && <div className="item-container">
//     {products.map((product, index) =>(
//         <Card 
//         product={product}
//     key={product.id + "_" + index}

//     />
//     ))}
// </div>} */}
//       <TopButton />
//     </div>
//   );
// };
// export default MainPage;


import "./MainPage.css";
import Categories from "./Categories";
import TopButton from "./TopButton";

const MainPage = () => {
  return (
    <div className="main-layout">
      <Categories />
      <TopButton />
    </div>
  );
};
export default MainPage;
