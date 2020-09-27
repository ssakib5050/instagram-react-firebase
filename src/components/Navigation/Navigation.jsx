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

import { Dropdown, Button, Modal, Form, ProgressBar } from "react-bootstrap";
import firebase from "firebase";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function Navigation() {
  const [navInputFocus, setNavInputFocus] = useState(false);
  const [navInput, setNavInput] = useState("");
  const [postCreateModal, setPostCreateModal] = useState(false);

  const [postCaption, setPostCaption] = useState("");
  const [postTags, setPostTags] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);
  const [postProgressbar, setPostProgressbar] = useState(null);

  const modalClose = () => setPostCreateModal(false);
  const modalOpen = () => setPostCreateModal(true);

  const handlePost = () => {
    if (postCaption && postTags && imageFileTypeMatch(postPhoto.name)) {
      console.log(postPhoto.name);
      const file = postPhoto;
      const uploadTask = storage
        .ref()
        // .child(`images/${uuidv4()}.${file}`)
        .child(`images/${uuidv4()}.${postPhoto.name}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);

          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPostProgressbar(progress + 1);
        },
        (error) => {
          console.log(error);
        },
        () => {
          const downloadURl = uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              db.collection("posts").add({
                username: "ssakib4050",
                postCaption: "",
                postTags: "",
                postImage: "",
                profileImage: "",
                likes: [],
                comments: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });

              cancelPost();
            });

          console.log(downloadURl);
        }
      );
    } else {
      console.log("Please fill the above fields");
    }
  };
  const cancelPost = () => {
    setPostCaption("");
    setPostTags("");
    setPostPhoto(null);
    setPostProgressbar(null);

    modalClose();
  };
  return (
    <div className="nav__container">
      <Modal show={postCreateModal} onHide={cancelPost} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setPostCaption(e.target.value)}
              value={postCaption}
              as="textarea"
              rows={3}
              placeholder="Enter Caption"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setPostTags(e.target.value)}
              value={postTags}
              type="email"
              placeholder="Enter Tags"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.File
              onChange={(e) => setPostPhoto(e.target.files[0])}
              id="custom-file"
              label={postPhoto ? postPhoto.name : "Upload a Photo"}
              custom
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            {postProgressbar ? (
              <ProgressBar animated now={postProgressbar} />
            ) : (
              ""
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={cancelPost}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handlePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
            <div className="nav__menubar_icon_wrap" onClick={modalOpen}>
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

function imageFileTypeMatch(filename) {
  const fileType = filename.split(".").pop();
  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    return true;
  }
  return false;
}

export default Navigation;
