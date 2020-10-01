import React, { useEffect, useState } from "react";
import "./SignupSetup.css";

import { auth, storage } from "../../firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [singupSetup, setSingupSetup] = useState(null);
  const [loadingSubmitButton, setLoadSubmitButton] = useState(false);
  const history = useHistory();

  //   console.log(profileImage);
  console.log("Signup", auth.currentUser);

  const signupHandle = (e) => {
    e.preventDefault();
    setSingupSetup("");

    if (fullName && imageFileTypeMatch(profileImage.name)) {
      setLoadSubmitButton(true);

      const file = profileImage;
      const uploadTask = storage
        .ref()
        // .child(`images/${uuidv4()}.${file}`)
        .child(`images/${uuidv4()}.${profileImage.name}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //   console.log(error);
          setSingupSetup("Sorry Something Went Wrong");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            console.log(downloadUrl);
            const user = auth.currentUser;
            user
              .updateProfile({
                displayName: fullName,
                photoURL: downloadUrl,
              })
              .then(function () {
                // Update successful.
                history.push("/");
              })
              .catch(function (error) {
                // An error happened.
                singupSetup("Sorry Something went wrong");
              });
          });
        }
      );
      //
    } else {
      setSingupSetup("Sorry Something went wrong");
    }

    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch((error) => setSignupError(error.message));
    // console.log("Sign Up", email, password);
  };

  const submitDisable = () => {
    // if (email && password.length >= 8) {
    //   return false;
    // } else {
    //   return true;
    // }
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
                  placeholder="FullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />

                <label
                  htmlFor="signup__file"
                  className="login__input_email"
                  id="signup__file_label"
                >
                  {profileImage ? profileImage.name : "Choose File"}
                </label>
                <input
                  id="signup__file"
                  type="file"
                  className="login__input_emai"
                  placeholder="FullName"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />

                <input
                  type="submit"
                  value={!loadingSubmitButton ? "Submit" : "Submitting..."}
                  className="login__input_submit"
                  onClick={signupHandle}
                  isabled={submitDisable() ? "disabled" : ""}
                />
                {singupSetup && (
                  <p className="mt-2 text-center text-danger login__login_error">
                    {singupSetup}
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

function imageFileTypeMatch(filename) {
  const fileType = filename.split(".").pop();
  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    return true;
  }
  return false;
}

export default Signup;
