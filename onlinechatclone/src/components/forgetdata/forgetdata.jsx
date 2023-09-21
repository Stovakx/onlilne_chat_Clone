import React, { useState } from "react";
import axios from '../../utils/axios';
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import "./forgetdata.css";

export default function ForgetPWForm({
    setShowSignupForm,
    setShowForgetPWForm,
  }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    secretAnswer: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Sample code to make a POST request using axios
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("/register", userData)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <form
      className="form forgetPWform"
      onSubmit={handleFormSubmit}
    >
      <p id="heading">Forget password</p>
      <div className="field">
        <AlternateEmailIcon/>
        <input
          autoComplete="off"
          placeholder="Username/email"
          className="input-field"
          type="text"
          onChange={handleChange}
        ></input>
      </div>
      <div className="field">
        <LockIcon/>
        <input
          placeholder="Password"
          className="input-field"
          type="password"
          onChange={handleChange}
        ></input>
      </div>
      <button className="button3" type="submit">
        Send email
      </button>
      <div className="btnDiv">
        <button
          className="button1"
          onClick={() => setShowForgetPWForm(false)}
        >
          Login
        </button>
        <button className="button2" 
            onClick={() =>{ 
                setShowSignupForm(true),
                setShowForgetPWForm(false)
            }}>
            Sign Up
        </button>
      </div>
    </form>
  );
}
