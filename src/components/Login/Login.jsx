import React, { useState } from "react";
import "./Login.css";

import { auth } from "../../firebase";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const loginHandle = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setLoginError(error.message));
  };

  const submitDisable = () => {
    if (email && password.length >= 8) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="login__container container-fluid">
      <div className="login__wrap">
        <div className="row login__row">
          <div className="col-12 col-md-6 ">
            <div className="dev login__main">
              <div className="login__brand_wrap">
                <img
                  src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png"
                  alt=""
                  className="login__brand"
                />
              </div>

              <form action="" className="login__form">
                <input
                  type="text"
                  className="login__input_email"
                  placeholder="Phone number, username, or email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  autoComplete="false"
                  className="login__input_password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <input
                  type="submit"
                  className="login__input_submit"
                  onClick={loginHandle}
                  disabled={submitDisable() ? "disabled" : ""}
                />

                {loginError && (
                  <p className="mt-2 text-center text-danger login__login_error">
                    {loginError}
                  </p>
                )}

                <Link to="/" className="login__reset_password">
                  Forgot Password
                </Link>
              </form>
            </div>

            <div className="dev login__main">
              <div className="post__login_wrap text-center">
                <p className="post__login_text mb-0">
                  Don't have an account?{" "}
                  <Link to="signup" className="login__signup">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
