import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");


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
            const response = await axios.post("http://localhost:5001/register", newUser);
            console.log(response.data);
            setEmail("");
            setPassword("");
            setConfirmPassword("")
        } catch (error) {
            console.log("signup failed", error)
        }
    };


	return (
		<>
			<div className="credentials-form">
				<h2>create a new account</h2>
				<form className="login-form" action="">
					<label htmlFor="email">Email </label>

					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="password">Password</label>

					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					  <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && <p className="login-wrongcredentials">{passwordError}</p>}
					<button onClick={handleSignup} className="login-form-btn ">
						Continue
					</button>
				</form>
			</div>
		</>
	);
};

export default SignupForm;

//for signup
// http://localhost:5001/api/users/register
