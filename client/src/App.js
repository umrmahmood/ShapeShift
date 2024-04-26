import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Cart from "./components/Cart";



function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
			</header>
			<Main />
			
			{/* <Features /> */}
			<Cart />
			<Footer />
		</div>
	);
}

export default App;