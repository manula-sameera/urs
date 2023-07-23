import axios from "axios";

//token auth
function Auth() {
  const token = document.cookie.split("=")[1];
  //if token is null then redirect to login page
  if (!token) {
    // Navigate to your sign up page here
    window.location.href = "/";
  } else {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://mditest.elifeamerica.com/api/v1/auth/user", { headers })
      .then((response) => {
        //check response is 200
        if (response.status === 200) {
          return true;
        } else {
          window.location.href = "/";
          return false;
        }
      })
      .catch((error) => console.log(error));
  }
}

export default { Auth };
