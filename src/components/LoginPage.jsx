import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions";
import { connect } from "react-redux";
import useAPI from "../hooks/useAPI";

function LoginPage({ setUser }) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { login } = useAPI();
  const [err, setErr] = useState("");

  const handleLogin = useCallback(async () => {
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
    const json = await login(username, password);
    if (!json.success) {
      setErr(json.error);
    } else {
      setUser(json.data);
      //navigate automatically sends the user to a page (in this case search)
      navigate("/search");
    }
  }, []);

  return (
    <div className="center margin-20">
      <h4 className="segoe margin-20">
        Log in to search and view your favorites
      </h4>
      <div className="center margin-20">
        <label htmlFor="username">Username: </label>
        <input ref={usernameInput} type="text" id="username" />
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input ref={passwordInput} type="password" id="password" />
      </div>
      <button className="button-lpurple" onClick={handleLogin}>
        Log in
      </button>
      <h4 className="text-red">{err}</h4>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
