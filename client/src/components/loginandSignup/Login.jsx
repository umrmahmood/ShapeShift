
import "../../styling/loginandSignup.css";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const allIngredients = [{ label: "Login" }, { label: "Signup" }];
const [login, signup] = allIngredients;
const initialTabs = [login, signup];

const Login = ({ toggleLogin}) => {
	const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
	

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	const handleLoginSuccess = () => {
		toggleLogin();
    };


	const renderForm = () => {
		switch (selectedTab.label) {
			case "Login":
				return <LoginForm onLoginSuccess={handleLoginSuccess}/>;
			case "Signup":
				return <SignupForm onClose={toggleLogin}/>;
			default:
				return null;
		}
	};
	

	return (
		<div className="login-outter">
			<div className="login-window">
				<nav className="login-nav">
					<ul className="ul-login">
						{initialTabs.map((item) => (
							<li
								key={item.label}
								className={item === selectedTab ? "selected" : ""}
								onClick={() => handleTabClick(item)}
							>
								{`${item.label}`}
								{item === selectedTab ? (
									<motion.div className="underline" layoutId="underline" />
								) : null}
							</li>
						))}
					</ul>
				</nav>
				<main className="login-main">
					<AnimatePresence mode="wait">
						<motion.div
							key={selectedTab ? selectedTab.label : "empty"}
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -10, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							{renderForm()}
						</motion.div>
					</AnimatePresence>
				</main>
				<p className="login-para">
					By joining, you agree to the Shapeshift Terms of Service and to
					occasionally receive emails from us. Please read our Privacy Policy to
					learn how we use your personal data.
				</p>
			</div>
		</div>
	);
};




export default Login;

