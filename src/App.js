import "./App.css";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import SuccessMessageScreen from "./SuccessMessageScreen";
import ProfileScreen from "./ProfileScreen";
import ConfirmationScreen from "./ConfirmationScreen";
import EditProfileScreen from "./EditProfileScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/SignUpScreen" element={<SignUpScreen />} />
          <Route path="/SuccessMessageScreen" element={<SuccessMessageScreen />}/>
          <Route path="/ProfileScreen" element={<ProfileScreen />} />
          <Route path="/EditProfileScreen" element={<EditProfileScreen />} />
          <Route path="/ConfirmationScreen" element={<ConfirmationScreen />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
