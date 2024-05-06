import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import "../../styling/loginandSignup.css";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth"; // Import Firebase authentication functions

// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnYIO4ar5V7mDIj9fq1Y0gA0VzrpFgHSM",
  authDomain: "shapeshift-8732c.firebaseapp.com",
  projectId: "shapeshift-8732c",
  storageBucket: "shapeshift-8732c.appspot.com",
  messagingSenderId: "602731506848",
  appId: "1:602731506848:web:b27120d7a7a82def20adc5",
  measurementId: "G-HL7Q4KHP3M",
};


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredential, setWrongCredential] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(); // Get Firebase authentication instance


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response);
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

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(auth, provider); // Initiate Google sign-in popup
      const user = result.user;

      // Data for the backend
      const userData = { email: user.email, googleUserId: user.uid };
      const response = await axios.post(
        "http://localhost:5001/api/users/firelogin",
        userData // Send userData directly without wrapping it
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("shapeshiftkey", token);
        onLoginSuccess();
        navigate("/"); // Redirect to homepage or any other route
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle errors if any
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
            <button
              onClick={email && password !== "" ? handleLogin : null}
              className={
                email && password !== ""
                  ? "login-form-btn"
                  : "login-form-btn-inactive"
              }
            >
              Continue
            </button>
          </form>
        </div>
        {/* Button to initiate Google login */}
        <button onClick={handleGoogleLogin} className="google-login-form-btn">
          <FontAwesomeIcon icon={faGoogle} />
          <span className="google-login-btn-text">Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
