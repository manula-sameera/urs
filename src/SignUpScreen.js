import "./SignUpScreen.css";
import axios from "axios";

import React, { useState } from "react";

function SignUpScreen() {
  // Define state variables for the form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  const handleEmailChange = (e) => {
    //check email availability
    axios
      .get(
        "https://mditest.elifeamerica.com/api/v1/email/check/" + e.target.value
      )
      .then((response) => {
        console.log(response.data.result.exist);
        if (response.data.result.exist === true) {
          alert("Email already exists");
          setEmail("");
          e.target.value = "";
        } else {
          setEmail(e.target.value);
        }
      })
      .catch((error) => console.log(error));
  };

  // Define a function to handle the form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Perform your sign up logic here
    const data = {
      email: email,
      password: password,
      confirm_password: password,
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobile,
      dob: dob,
    };
    // Navigate to your sign up page here
    axios
      .post("https://mditest.elifeamerica.com/api/v1/register", data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="sign-up-form">
      <h1>ABC Company</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            // value={email}
            onBlur={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="dob">Password</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <footer>
        <a href="/">About Us</a>
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
        <p>Version 1.0</p>
      </footer>
    </div>
  );
}

export default SignUpScreen;
