import React, { useEffect, useState } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import MainContent from "./components/MainContent/MainContent";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SignupSetup from "./components/SignupSetup/SignupSetup";

import { auth } from "./firebase";
import { Switch, Route } from "react-router-dom";

function App() {
  const [signedIn, setSignedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [username, setUsername] = useState(null);

  // console.log("Apps", auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        if (displayName) {
          setSignedIn(user.email);
        }

        setCurrentUser(auth.currentUser);
        setPhotoURL(photoURL);
        setUsername(displayName);

        //
        // console.log("Sign In", user);
        // console.log("displayName", displayName);
        // console.log("email", email);
        // console.log("emailVerified", emailVerified);
        // console.log("photoURL", photoURL);
        // console.log("isAnonymous", isAnonymous);
        // console.log("uid", uid);
        // console.log("providerData", providerData);
      } else {
        setSignedIn(null);
      }
    });
  }, []);
  return (
    <div className="app__container">
      {signedIn ? (
        <div>
          <Navigation photoURL={photoURL} />

          <MainContent photoURL={photoURL} username={username} />
        </div>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/signup/setup" exact>
            <SignupSetup currentUser={currentUser} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
