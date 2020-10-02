import React from "react";
import "./Sidebar.css";

function Sidebar({ photoURL, username }) {
  const suggestions = [
    {
      username: "Cierra Vega",
      photoURL:
        "https://sa1s3optim.patientpop.com/assets/images/provider/photos/1888657.jpg",
    },
    {
      username: "Alden Cantrell",
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDJ3tpalBt9vTwRsfBlJ1IZ6MryKwFEAu5ng&usqp=CAU",
    },
    {
      username: "Kierra Gentry",
      photoURL:
        "https://images.unsplash.com/photo-1589673644418-f8cb57a01d3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    },
    {
      username: "Pierre Cox",
      photoURL:
        "https://i.pinimg.com/originals/78/fb/1e/78fb1ebde1bf55630a50b4ca9ee41664.jpg",
    },
    {
      username: "Thomas Crane",
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrpQyRAiO4DQH1pX8T2FtAuH5_e2lvDs7t3A&usqp=CAU",
    },
  ];

  return (
    <div className="sidebar__container">
      <div className="sidebar__wrap">
        <div className="sidebar__profile">
          <img src={photoURL} alt="" className="sidebar__profile_image" />
        </div>
        <div className="sidebar__userinfo">
          <h2 className="sidebar__userinfo_username">{username}</h2>
        </div>
      </div>
      <p className="sidebar__suggestions">Suggestions For You</p>
      <div className="sidebar__suggestions_wrap">
        {suggestions.map((suggestion, index) => (
          <Suggestions
            key={index}
            photoURL={suggestion.photoURL}
            username={suggestion.username}
          />
        ))}
      </div>

      <div className="sidebar__menuItems">
        <button className="sidebar__menuItems_btn">About</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Help</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Press</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">API</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Jobs</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Privacy</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Terms</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Locations</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Top Accounts</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Hashtags</button>{" "}
        <span>&middot; </span>
        <button className="sidebar__menuItems_btn">Language</button>
      </div>

      <div>
        <p className="sidebar__copyright_text">
          &copy; Copyright Instagram Clone All Rights Reserved 2020
        </p>
      </div>
    </div>
  );
}

function Suggestions({ photoURL, username }) {
  return (
    <div className="sidebar__profile_manage">
      <div className="sidebar_profile_username">
        <div className="sidebar_suggestions_img_wrap">
          <img src={photoURL} alt="" className="sidebar_suggestions_img" />
        </div>
        <div className="sidebar_profile_username_main">
          <b>{username}</b>
        </div>
      </div>
      <div>
        <button className="sidebar_profile_follow">Follow</button>
      </div>
    </div>
  );
}
export default Sidebar;
