import React, { useEffect, useState } from "react";
import "./Signup.css";

import { auth } from "../../firebase";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupHandle = (e) => {
    e.preventDefault();
    console.log("Sign Up", email, password);
  };

  const submitDisable = () => {
    if (email && password.length >= 8) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="login__container dev container-fluid">
      <div className="login__wrap dev">
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
              <p className="signup__signup_text">
                Sign up to see photos and videos from your friends.
              </p>

              <form action="" className="login__form">
                <input
                  type="text"
                  className="login__input_email"
                  placeholder="Mobile Number or Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="text"
                  className="login__input_password"
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />

                <input
                  type="text"
                  className="login__input_email"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />

                <input
                  type="password"
                  autoComplete="false"
                  className="login__input_email"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <input
                  type="submit"
                  className="login__input_submit"
                  onClick={signupHandle}
                />

                <Link to="/" className="login__reset_password">
                  Forgot Password
                </Link>
              </form>
            </div>

            <div className="dev login__main">
              <div className="post__login_wrap text-center">
                <p className="post__login_text mb-0">
                  Have an account?{" "}
                  <Link to="/" className="login__signup">
                    Log In
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

export default Signup;
