import React, { useState } from "react";
import "./Navigation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCompass,
  faHeart,
  faUser,
  faSearch,
  faTimesCircle,
  faSave,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Dropdown } from "react-bootstrap";

function Navigation() {
  const [navInputFocus, setNavInputFocus] = useState(false);
  const [navInput, setNavInput] = useState("");
  return (
    <div className="nav__container">
      <div className="container">
        <div className="nav__wrapper">
          <div className="nav__brand">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="nav__brand_img"
            />
          </div>

          <div className="nav__searchBar d-none d-md-block">
            <FontAwesomeIcon
              className={`nav__searchBar_search ${
                navInputFocus ? "active" : navInput ? "active" : ""
              }`}
              icon={faSearch}
            />
            <input
              type="text"
              placeholder="Search"
              className={`nav__searchBar_input ${
                navInputFocus ? "active" : navInput ? "active" : ""
              }`}
              onFocus={() => setNavInputFocus(true)}
              onBlur={() => setNavInputFocus(false)}
              onChange={(e) => setNavInput(e.target.value)}
              value={navInput}
            />
            <FontAwesomeIcon
              className={`nav__searchBar_cross ${
                navInputFocus ? "active" : ""
              }`}
              icon={faTimesCircle}
            />
          </div>

          <div className="nav__menubar">
            <div className="nav__menubar_icon_wrap">
              <FontAwesomeIcon className="nav__menubar_icon" icon={faHome} />
            </div>
            <div className="nav__menubar_icon_wrap">
              <FontAwesomeIcon className="nav__menubar_icon" icon={faPlus} />
            </div>
            <div className="nav__menubar_icon_wrap">
              <FontAwesomeIcon className="nav__menubar_icon" icon={faCompass} />
            </div>
            <div className="nav__menubar_icon_wrap">
              <FontAwesomeIcon className="nav__menubar_icon" icon={faHeart} />
            </div>

            {/* <div className="nav__menubar_icon_wrap">
              <FontAwesomeIcon className="nav__menubar_icon" icon={faUser} />
            </div> */}

            <Dropdown className="nav__menubar_lastIcon_wrapper">
              <Dropdown.Toggle className="nav__menubar_icon_wrap">
                <FontAwesomeIcon className="nav__menubar_icon" icon={faUser} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  <FontAwesomeIcon
                    className="nav__menubar_lastDropdown_item"
                    icon={faUser}
                  />{" "}
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <FontAwesomeIcon
                    className="nav__menubar_lastDropdown_item nav__menubar_lastDropdown_item_saved"
                    icon={faSave}
                  />
                  Saved
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <FontAwesomeIcon
                    className="nav__menubar_lastDropdown_item"
                    icon={faCog}
                  />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  className="nav__menubar_lastDropdown_item_logout"
                >
                  <FontAwesomeIcon
                    className="nav__menubar_lastDropdown_item "
                    icon={faSignOutAlt}
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
