import React, { useState } from "react";
import LoginForm from "../components/loginform/loginform";
import SignupForm from "../components/registrationform/registrationForm";
import ForgetPWForm from "../components/forgetdata/forgetdata";

export default function IndexPage() {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showForgetPWForm, setShowForgetPWForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <>
      <div className="WelcomeContainer">
        <h1 className="">Welcome to my online chat clone</h1>
      </div>

      {showSignupForm ? (
        <SignupForm
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          setShowSignupForm={setShowSignupForm}
        />
      ) : showForgetPWForm ? (
        <ForgetPWForm
          showForgetPWForm={showForgetPWForm}
          setShowForgetPWForm={setShowForgetPWForm}
          showSignupForm={showSignupForm}
          showLoginForm={showLoginForm}
          setShowSignupForm={setShowSignupForm}
        />
      ) : (
        <LoginForm
          showSignupForm={showSignupForm}
          setShowSignupForm={setShowSignupForm}
          setShowForgetPWForm={setShowForgetPWForm}
        />
      )}
    </>
  );
}
