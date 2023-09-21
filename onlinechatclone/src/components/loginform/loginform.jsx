import React, { useState } from "react";
import "./loginform.css";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function LoginForm({
  showSignupForm,
  setShowSignupForm,
  showForgetPWForm,
  setShowForgetPWForm,
}) {
  const [name, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //předělat vůči backend
      await axios.post("/login", {
        name: name,
        password: password,
      });
      navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
      // todo display if pw or user or email is incorrect
    }
  };
  return (
    <form className="form" onSubmit={handleLogin}>
      <p id="heading">Login</p>
      <div className="field">
        <PersonIcon className="input-icon" />
        <input
          autoComplete="off"
          placeholder="Username/email"
          className="input-field"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setLoginIdentifier(e.target.value)}
        />
      </div>
      <div className="field">
        <KeyIcon className="input-icon" />
        <input
          autoComplete="off"
          placeholder="Password"
          className="input-field"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="btnDiv">
        <button className=" button1" type="submit">
          Login
        </button>
        <button
          className="button2"
          type="button"
          onClick={() => setShowSignupForm(true)}
        >
          Sign Up
        </button>
      </div>
      <button
        className="button3"
        type="button"
        onClick={() => setShowForgetPWForm(true)}
      >
        Forgot Password
      </button>
    </form>
  );
}
export default LoginForm;
