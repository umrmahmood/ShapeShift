import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
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
