import { useState } from "react";
import axios from "axios";

const SignupForm = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [successMesage, setSuccessMessage] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPasswordError("Passwords don't match");
			return;
		}
		try {
			const newUser = {
				email,
				password,
			};
			const response = await axios.post(
				"http://localhost:5001/api/users/register",
				newUser
			);
			console.log(response.data);
			setSuccessMessage(response.data.message);
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		} catch (error) {
			console.log("signup failed", error);
		}
	};

	return (
		<>
			<div className="credentials-form">
				{!successMesage ? (
					<>
						<h2>create a new account</h2>
						<form className="login-form" action="">
							<label htmlFor="email">Email </label>

							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<label htmlFor="password">Password</label>

							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
							{passwordError && (
								<p className="login-wrongcredentials">{passwordError}</p>
							)}

							<button
								onClick={
									email && password && confirmPassword !== ""
										? handleSignup
										: null
								}
								className={
									email && password && confirmPassword !== ""
										? "login-form-btn"
										: "login-form-btn-inactive"
								}
							>
								Continue
							</button>
						</form>
					</>
				) : (
					<>
						<div className="signup-success">
							<h2>{successMesage}!</h2>
							<p className="signup-email-message">
								An email has been sent to your email address for confirmation.
							</p>
							<button onClick={onClose} className="signup-email-message-btn">
								Close
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SignupForm;
