import React, { useState, useEffect } from "react";
import "./ProfileScreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import services from "./Services";

function ProfileScreen() {
  // Define state variables for the user's email and date of birth
  const [mail, setEmail] = useState("john.baker@example.com");
  const [dob, setDob] = useState("01/01/1980");
  const [uname, setUname] = useState("John Baker");
  const [gender, setGender] = useState("Male");
  const [profileimage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  // Define a function to handle the edit profile button click
  function handleEditProfile(e) {
    e.preventDefault();
    // Navigate to your edit profile page here
    window.location.href = "/EditProfileScreen";
  }

  function handleChangeProfileImage(e) {
    e.preventDefault();
    // Create a file input element and trigger the click event to let the user select an image
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg, image/png";

    fileInput.onchange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Upload the selected image
        const formData = new FormData();
        formData.append("profile_image", selectedFile);

        const token = document.cookie.split("=")[1];
        const headers = {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        };

        axios
          .post(
            "https://mditest.elifeamerica.com/api/v1/profile/avatar",
            formData,
            {
              headers,
            }
          )
          .then((response) => {
            // Update the profile image with the new image URL
            setProfileImage(response.data.result.resource);
            // Clear the input value to allow re-uploading the same image
            fileInput.value = null;
          })
          .catch((error) => {
            // Handle errors during image upload
            console.error("Error uploading image:", error);
            // Clear the input value in case of an error
            fileInput.value = null;
            // You might also show an error message to the user
          });
      }
    };

    // Trigger the click event to open the file selection dialog
    fileInput.click();
  }

  // Define a function to handle the sign out button click
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

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    //if token is null then redirect to login page
    if (!token) {
      // Navigate to your sign up page here
      window.location.href = "/";
    } else {
      services.Auth();
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      axios
        .get("https://mditest.elifeamerica.com/api/v1/profile", { headers })
        .then((response) => {
          //show data
          setEmail(response.data.result.email);
          setDob(response.data.result.dob);
          setUname(response.data.result.full_name);
          setGender(response.data.result.gender);
          setProfileImage(response.data.result.profile_image.resource);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function showMenu() {
    const menu = document.getElementById("profileMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  return (
    <div className="profile-page">
      <header>
        <div className="profile-header">
          <div className="profile-info">
            <p>ABC COMPANY</p>
          </div>
          <div className="profile-avatar">
            <img src={profileimage} alt="Profile" />
            <p className="welcome-text" onClick={showMenu}>
             {uname}
            </p>
            <div className="menu" id="profileMenu">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="row">
          <div className="col-md-6">
            <div className="profile-image-container">
              <img src={profileimage} alt="Profile" width={150} height={150} />
              <button
                className="change-profile-button"
                onClick={handleChangeProfileImage}
              >
                Change Profile Image
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={mail} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={uname} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender" value={gender} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="text" id="dob" value={dob} readOnly />
        </div>
      </main>
    </div>
  );
}

export default ProfileScreen;
