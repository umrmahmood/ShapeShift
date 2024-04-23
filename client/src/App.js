import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

import Footer from "./components/Footer";
// import ProductForm from "./components/productReg/ProductForm.jsx";

import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";

function App() {
	return (
		
		<div className="App">
			<header className="App-header">
				<Navbar />
			</header>
			<Routes>
				<Route path="/config" element={<ConfigComponent />} />
				<Route path="/" element={<Main />} />
				</Routes>
			
			<Footer />
			
		</div>
	);
}

export default App;
