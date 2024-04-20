import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Materials from "../src/components/uploadDesign/Materials.jsx";
import ColorSelector from "./components/uploadDesign/ColorSelector.jsx";
import Resolution from "./components/uploadDesign/Resolution.jsx";

import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Resistance from "./components/uploadDesign/Resistance.jsx";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
			</header>
			<Main />
			<Features />
			<Footer />
			<Materials />
			<ColorSelector/>
			<Resolution/>
			<Resistance />
		</div>
	);
}

export default App;