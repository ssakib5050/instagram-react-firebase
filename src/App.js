import React, { useEffect, useState } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import MainContent from "./components/MainContent/MainContent";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(user.email);
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
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
          <Navigation />

          <MainContent />
        </div>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
