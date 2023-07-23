import React, { useState, useEffect } from "react";
import "./EditProfileScreen.css";
import axios from "axios";
import Services from "./Services";

function EditProfileScreen() {
  // Use state hooks to store the input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const profileimage= "https://via.placeholder.com/150";


  useEffect(() => {
    Services.Auth();
  }, []);

  function handleSignOut(e) {
    const token = document.cookie.split("=")[1];
    e.preventDefault();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://mditest.elifeamerica.com/api/v1/logout", { headers })
      .then((response) => {
        //remove cookie
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  }

  // Handle the change events of the input fields
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

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

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Handle the submit event of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = document.cookie.split("=")[1];
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      dob: dateOfBirth,
      gender: gender,
    };
    axios
      .put("https://mditest.elifeamerica.com/api/v1/profile", data, { headers })
      .then((response) => {
        alert(`Profile updated for ${firstName} ${lastName}`);
        //go to profile page
        window.location.href = "/ProfileScreen";
      })
      .catch((error) => console.log(error));
  };
  function showMenu() {
    const menu = document.getElementById("profileMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  return (
    <div className="Edit-profile-page">
      <header>
        <div className="profile-header">
          <div className="profile-info">
            <p>ABC COMPANY</p>
          </div>
          <div className="profile-avatar">
            <img src={profileimage} alt="Profile" />
            <p className="welcome-text" onClick={showMenu}>
              Mr. John Baker
            </p>
            <div className="menu" id="profileMenu">
              {/* <button onClick={handleEditProfile}>Edit Profile</button> */}
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </header>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="col">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="col">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="col">
            <input
              type="email"
              id="email"
              name="email"
              // value={email}
              onBlur={handleEmailChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="dateOfBirth">Date of Birth</label>
          </div>
          <div className="col">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="col">
            <input
              type="radio"
              id="male"
              name="gender"
              value="1"
              //   checked={gender === "1"}
              onChange={handleGenderChange}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="2"
              //   checked={gender === "2"}
              onChange={handleGenderChange}
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="3"
              //   checked={gender === "3"}
              onChange={handleGenderChange}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfileScreen;
