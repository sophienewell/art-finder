import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import useAPI from "../hooks/useAPI";

function SignUpPage() {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { signUp } = useAPI();

  const handleSignup = useCallback(async () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    if (
      username.length < 4 ||
      username.length > 20 ||
      password.length < 4 ||
      password.length > 20
    ) {
      return;
    }
    const json = await signUp(username, password);
    if (!json.success) {
      console.log(json.error);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="center margin-20">
      <div className="center margin-20">
        <label htmlFor="username">Username:</label>
        <input ref={usernameInput} type="text" id="username" />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input ref={passwordInput} type="password" id="password" />
      </div>
      <button className="margin-20" onClick={handleSignup}>
        Sign up
      </button>
    </div>
  );
}

export default SignUpPage;
