
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
// import ItemPage from "./CardComponent/ItemPage";
import UserSellCard from "./CardComponent/UserSellCard";
import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";
import Printer from "./components/Printer";


function App() {
	return (
		<div className="App">
		  <header className="App-header">
			<Navbar />
		  </header>
		  <Routes>
			<Route path="/" element={<Main />} />
			<Route path="/config" element={<ConfigComponent />} />
			{/* <Route path="/item" element={<ItemPage />} /> */}
			<Route path="/home" element={<UserSellCard />} />
			<Route path="/printers" element={<Printer />} />
		  </Routes>
		  <Footer />
		</div>
	);
  }
export default App;
