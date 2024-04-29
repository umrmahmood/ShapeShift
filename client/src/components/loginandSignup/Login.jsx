// import "../../styling/loginandSignup.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const allIngredients = [{ label: "Login" }, { label: "Signup" }];
// const [login, signup] = allIngredients;
// const initialTabs = [login, signup];

// const Login = () => {
// 	const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

// 	const handleTabClick = (tab) => {
// 		setSelectedTab(tab);
// 	};

// 	const renderForm = () => {
// 		switch (selectedTab.label) {
// 			case "Login":
// 				return <LoginForm />;
// 			case "Signup":
// 				return <MaterialForm />;
// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<div className="login-outter">
// 			<div className="login-window">
// 				<nav className="login-nav">
// 					<ul className="ul-login">
// 						{initialTabs.map((item) => (
// 							<li
// 								key={item.label}
// 								className={item === selectedTab ? "selected" : ""}
// 								onClick={() => handleTabClick(item)}
// 							>
// 								{`${item.label}`}
// 								{item === selectedTab ? (
// 									<motion.div className="underline" layoutId="underline" />
// 								) : null}
// 							</li>
// 						))}
// 					</ul>
// 				</nav>
// 				<main className="login-main">
// 					<AnimatePresence mode="wait">
// 						<motion.div
// 							key={selectedTab ? selectedTab.label : "empty"}
// 							initial={{ y: 10, opacity: 0 }}
// 							animate={{ y: 0, opacity: 1 }}
// 							exit={{ y: -10, opacity: 0 }}
// 							transition={{ duration: 0.2 }}
// 						>
// 							{renderForm()}
// 						</motion.div>
// 					</AnimatePresence>
// 				</main>
// 				<p className="login-para">
// 					By joining, you agree to the Shapeshift Terms of Service and to
// 					occasionally receive emails from us. Please read our Privacy Policy to
// 					learn how we use your personal data.
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// const LoginForm = () => {
// 	return (
// 		<>
// 			<div className="credentials-form">
// 				<h2>Sign in to your account</h2>
// 				<div>
// 					<form className="login-form" action="">
// 						<label htmlFor="">Email </label>

// 						<input type="text" />

// 						<label htmlFor="">Password</label>

// 						<input type="text" />

// 						<button className="login-form-btn ">Continue</button>
// 					</form>
// 				</div>
// 				<button className="google-login-form-btn">
// 					<FontAwesomeIcon icon={faGoogle} />
// 					<span className="google-login-btn-text">Continue with Google</span>
// 				</button>
// 			</div>
// 		</>
// 	);
// };

// const MaterialForm = () => {
// 	return (
// 		<>
// 			<div className="credentials-form">
// 				<h2>create a new account</h2>
// 				<form className="login-form" action="">
// 					<label htmlFor="">Email</label>
// 					<input type="text" />
// 					<label htmlFor="">Password</label>
// 					<input type="text" />
// 					<label htmlFor="">Confirm Password</label>
// 					<input type="text" />
// 					<button className="login-form-btn ">Continue</button>
// 				</form>
// 			</div>
// 		</>
// 	);
// };

// export default Login;



import "../../styling/loginandSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allIngredients = [{ label: "Login" }, { label: "Signup" }];
const [login, signup] = allIngredients;
const initialTabs = [login, signup];

const Login = () => {
	const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	const renderForm = () => {
		switch (selectedTab.label) {
			case "Login":
				return <LoginForm />;
			case "Signup":
				return <MaterialForm />;
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

const LoginForm = ({}) => {
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/user/login", { email: credential, username: credential, password });
            const { token, user } = response.data;
            console.log(response);
            localStorage.setItem("token", token);
            // localStorage.setItem("role", user.role);
            localStorage.setItem("userId", user._id);
            setIsLoggedIn(true);
            // setUserRole(localStorage.getItem("role"));
            navigate("/");
        } catch (error) {
            console.log("login failed", error);
        }
    };

	return (
		<>
			<div className="credentials-form">
				<h2>Sign in to your account</h2>
				<div>
					<form className="login-form" action="">
						<label htmlFor="">Email </label>

						<input
                        type="text"
                        id="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />

						<label htmlFor="">Password</label>

						<input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

						<button onSubmit={handleLogin} className="login-form-btn ">Continue</button>
					</form>
				</div>
				<button className="google-login-form-btn">
					<FontAwesomeIcon icon={faGoogle} />
					<span className="google-login-btn-text">Continue with Google</span>
				</button>
			</div>
		</>
	);
};

const MaterialForm = () => {
	return (
		<>
			<div className="credentials-form">
				<h2>create a new account</h2>
				<form className="login-form" action="">
					<label htmlFor="">Email</label>
					<input type="text" />
					<label htmlFor="">Password</label>
					<input type="text" />
					<label htmlFor="">Confirm Password</label>
					<input type="text" />
					<button className="login-form-btn ">Continue</button>
				</form>
			</div>
		</>
	);
};

export default Login;
