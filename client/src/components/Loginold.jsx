import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";
import axios from "axios";
import '../styling/login.css'


const Login = ({ navigate, isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
    // const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/user/login", { email: credential, username: credential, password });
            const { token, user } = response.data;
            console.log(response);
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("userId", user._id);
            setIsLoggedIn(true);
            setUserRole(localStorage.getItem("role"));
            navigate("/");
        } catch (error) {
            console.log("login failed", error);
        }
    };

    const onSuccess = async (res) => {
        try {
            const email = res.profileObj.email;
            const response = await axios.post("http://localhost:5000/user/google-login", { email });
            const { token, user } = response.data;
            console.log(response);
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("userId", user._id);
            setIsLoggedIn(true);
            setUserRole(localStorage.getItem("role"));
            navigate("/");
        } catch (error) {
            console.log("Google login failed", error);
        }
    };

    const onFailure = (res) => {
        console.log(res);
    };


    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        id="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                {/* <GoogleLogin
                    clientId={"135873137906-mvdousn5i0onq1mndi4kgbrm155rst51.apps.googleusercontent.com"}
                    buttonText="Google Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                /> */}

            </div>
        </div>

    )
};

export default Login;