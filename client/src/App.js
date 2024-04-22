import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import Features from "./components/Features";
import Footer from "./components/Footer";


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
			</header>
			<Main />
			<Features />
			<Footer />
		</div>
	);
}

export default App;