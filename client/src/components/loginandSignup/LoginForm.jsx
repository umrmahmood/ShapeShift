import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import "../../styling/loginandSignup.css";
import { useState } from "react";


const LoginForm = ({onLoginSuccess }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [wrongCredential, setWrongCredential] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5001/api/users/login", {
				email,
				password,
			});
			const { token } = response.data;

			localStorage.setItem("shapeshiftkey", token);
			// localStorage.setItem("role", user.role);
			// localStorage.setItem("userId", user._id);
			// setIsLoggedIn(true);
			// setUserRole(localStorage.getItem("role"));
			onLoginSuccess();
			navigate("/");
		} catch (error) {
			console.log(error);
			setWrongCredential("incorrect email or password.");
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
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<label htmlFor="">Password</label>

						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<p className="login-wrongcredentials">{wrongCredential}</p>
						<button onClick={email && password !== '' ? handleLogin : null} className={email && password !== '' ? 'login-form-btn' : 'login-form-btn-inactive'}>
							Continue
						</button>
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


export default LoginForm;