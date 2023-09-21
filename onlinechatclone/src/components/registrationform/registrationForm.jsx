import React from "react";
import "./registrationForm.css";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import axios from "../../utils/axios";

export default function SignupForm({
  showLoginForm,
  setShowLoginForm,
  setShowSignupForm,
}) {
  return (
    <>
      <form className="form">
        <p id="heading">Sign up</p>
        <div className="field">
          <PersonIcon />
          <input
            autoComplete="off"
            placeholder="username"
            className="input-field"
            type="text"
            name="name"
            required
          ></input>
        </div>
        <div className="field">
          <AlternateEmailIcon />
          <input
            autoComplete="off"
            placeholder="email"
            className="input-field"
            type="text"
            name="email"
            required
          ></input>
        </div>
        <div className="field">
          <LockIcon />
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            name="password"
            required
          ></input>
        </div>
        <div className="field">
          <LockIcon />
          <input
            placeholder="Confirm password"
            className="input-field"
            type="password"
          ></input>
        </div>
        {/* {!passwordMatch && <p className="pwMatch">Passwords do not match</p>} */}
        <button className="buttonCreateUser" type="submit">
          Create acount
        </button>
      </form>
      <button
        className="btn btnHaveAcc"
        onClick={() => {
          setShowSignupForm(false);
          setShowLoginForm(true);
        }}
      >
        Already have an account? <span className="loginSpan">login</span>
      </button>
    </>
  );
}
