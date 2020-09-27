import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar__container dev">
      <div className="sidebar__wrap">
        <div className="sidebar__profile">
          <img
            src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
            alt=""
            className="sidebar__profile_image"
          />
        </div>
        <div className="sidebar__userinfo">
          <h2 className="sidebar__userinfo_username">ssakib4050</h2>
          <p className="sidebar__userinfo_name">Sadman Sakib</p>
        </div>
      </div>
      <p className="sidebar__suggestions">Suggestions For You</p>
      <div className="sidebar__suggestions_wrap">
        <Suggestions />
        <Suggestions />
        <Suggestions />
        <Suggestions />
        <Suggestions />
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

function Suggestions() {
  return (
    <div className="sidebar__profile_manage">
      <div className="sidebar_profile_username">
        <div className="sidebar_suggestions_img_wrap">
          <img
            src="https://instagram.fdac41-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95872355_600891427301029_6376706423606214656_n.jpg?_nc_ht=instagram.fdac41-1.fna.fbcdn.net&_nc_ohc=2VedgFUWocEAX9RyjMr&oh=d186d550ecc72cc64dfe283cfd1a3122&oe=5F98A242"
            alt=""
            className="sidebar_suggestions_img"
          />
        </div>
        <div className="sidebar_profile_username_main">
          <b>ssakib4050</b>
        </div>
      </div>
      <div>
        <button className="sidebar_profile_follow">Follow</button>
      </div>
    </div>
  );
}
export default Sidebar;
