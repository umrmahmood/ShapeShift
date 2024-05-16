import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import "../../styling/loginandSignup.css";
import { useState } from "react";

// Firebase Sign-in
import firebaseApp from "../Firebase.jsx";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth"; // Import Firebase authentication functions

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredential, setWrongCredential] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp); // Get Firebase authentication instance

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
      const userData = { email: user.email, uid: user.uid };
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

  // Function to handle Github login
  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider(); // Create FacebookAuthProvider instance
      const result = await signInWithPopup(auth, provider); // Initiate Facebook sign-in popup
      const user = result.user;

      // Data for the backend
      const userData = { email: user.email, uid: user.uid }; // Assuming you have a field named 'facebookUserId' in your backend
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
        <button onClick={handleGithubLogin} className="google-login-form-btn">
          <FontAwesomeIcon icon={faGithub} />
          <span className="google-login-btn-text">Continue with GitHub</span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
