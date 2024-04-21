import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';




import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import Features from "./components/Features";
import Footer from "./components/Footer";


import ConfigComponent from "./components/uploadDesign/ConfigComponent.jsx";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
			</header>
			<Main />
			<Features />
			<Footer />
	
			
			
			<ConfigComponent/>
		</div>
	);
}

export default App;