import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ItemPage from "./CardComponent/ItemPage";
import UserSellCard from "./CardComponent/UserSellCard";
import Printer from "./components/Printer";

function App() {
	return (
    <Router>
      <div className="App">
			<header className="App-header">
				<Navbar />
			</header>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/features" element={<Features />} />
      <Route path="/item" element={<ItemPage />} />
      <Route path="/home" element={<UserSellCard/>} />
      <Route path="/printers" element={<Printer/>} />
      </Routes>

			<Footer />
		</div>
    </Router>

	);
}
