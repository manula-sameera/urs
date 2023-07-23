import "./LoginScreen.css";
import React, { useState } from "react";
import axios from "axios";

function LoginScreen() {
  // Define state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define a function to handle the login button click
  function handleLogin(e) {
    e.preventDefault();
    // Perform your login logic here

    const data = {
      client_id: "4",
      client_secret: "sfQfhp6tDeGvEp7ZhVwk0MjbpaP55tJ1oJAKuZAE",
      grant_type: "password",
      username: email,
      password: password,
    };
    // Navigate to your sign up page here
    axios
      .post("https://mditest.elifeamerica.com/oauth/token", data)
      .then((response) => {
        //create a cookie with the token
        document.cookie = "token=" + response.data.access_token + "; path=/;";
        window.location.href = "/ProfileScreen";
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="login-form">
      <h1>ABC Company</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <a href="/SignUpScreen">Don't have an account? Sign up</a>
      </form>
      <footer>
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
        <a href="/">About Us</a>
        <p>Version 1.0</p>
      </footer>
    </div>
  );
}

export default LoginScreen;
