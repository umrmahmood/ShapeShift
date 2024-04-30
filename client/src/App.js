// import "./App.css";
// import { Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
// import Navbar from "./components/Navbar";
// import Main from "./components/Main";
// import Footer from "./components/Footer";
// import ItemPage from "./CardComponent/ItemPage";
// import UserSellCard from "./CardComponent/UserSellCard";
// import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";
// import Printer from "./components/Printer";
// import OpenShop from "./components/openShop/OpenShop.jsx";
// import Login from "../src/components/loginandSignup/Login.jsx";
// import ProductForm from "./components/productReg/ProductForm";
// import UserShop from "./CardComponent/UserShop";




// function App() {
// 	const [showLogin, setShowLogin] = useState(false);

//     const toggleLogin = () => {
//         setShowLogin(!showLogin);
// 	};

// 	const handleLoginSuccess = () => {
//         setShowLogin(false); 
//     };

// 	const handleToggleLogin = () => {
// 		setShowLogin(!showLogin);
// 	};

// 	return (
// 		<div className="App">
// 		  <header className="App-header">
// 			<Navbar onLoginClick={toggleLogin}/>
// 			{showLogin && <div className="main-overlay" onClick={toggleLogin}></div>}
//             {showLogin && (
//                 <div className="login-popup">
//                     <Login onLoginSuccess={handleLoginSuccess} toggleLogin={handleToggleLogin}/>
//                 </div>
//             )}
// 		  </header>
// 		  <Routes>
// 			<Route path="/" element={<Main />} />
// 			<Route path="/config" element={<ConfigComponent />} />
// 		    <Route path="/item" element={<ItemPage />} /> 

// 			<Route path="/home" element={<UserSellCard />} />
// 			<Route path="/user-shop" element={<UserShop/>} />

// 			<Route path="/printers" element={<Printer />} />
// 			<Route path="/openshop" element={<OpenShop/>} />
// 			<Route path="/product-form" element={<ProductForm/>} />
// 		  </Routes>
// 		  <Footer />
// 		</div>
// 	);
//   }
// export default App;

import "./App.css";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ItemPage from "./CardComponent/ItemPage";
import UserSellCard from "./CardComponent/UserSellCard";
import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";
import Printer from "./components/Printer";
import OpenShop from "./components/openShop/OpenShop.jsx";
import Login from "../src/components/loginandSignup/Login.jsx";
import ProductForm from "./components/productReg/ProductForm";
import UserShop from "./CardComponent/UserShop";
import Cart from "./components/Cart.jsx";



function App() {
	const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
	};

	return (
		<div className="App">
		  <header className="App-header">
			<Navbar onLoginClick={toggleLogin}/>
			{showLogin && <div className="main-overlay" onClick={toggleLogin}></div>}
            {showLogin && (
                <div className="login-popup">
                    <Login toggleLogin={toggleLogin}/>
                </div>
            )}
		  </header>
		  <Routes>
			<Route path="/" element={<Main />} />
			<Route path="/config" element={<ConfigComponent />} />
		    <Route path="/item" element={<ItemPage />} /> 
            <Route path="/Cart" element={<Cart />} />
			<Route path="/home" element={<UserSellCard />} />
			<Route path="/user-shop" element={<UserShop/>} />

			<Route path="/printers" element={<Printer />} />
			<Route path="/openshop" element={<OpenShop/>} />
			<Route path="/product-form" element={<ProductForm/>} />
		  </Routes>
		  <Footer />
		</div>
	);
  }
export default App;