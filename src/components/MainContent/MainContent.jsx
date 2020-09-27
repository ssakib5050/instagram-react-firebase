import React from "react";
import "./MainContent.css";

import Post from "../Post/Post";
import Sidebar from "../Sidebar/Sidebar";

function MainContent() {
  return (
    <div className="mainContent__container dev">
      <div className="mainContent_wrapper container dev ">
        <div className="row">
          <div className="col-12 col-lg-7">
            <Post />
          </div>

          <div className="col-5">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
