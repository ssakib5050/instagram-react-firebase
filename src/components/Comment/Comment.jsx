import React from "react";
import "./Comment.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as liked,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as like,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

function Comment() {
  return (
    <div className="comments__container dev">
      <div className="comments__wrap">
        <div className="comment__image_wrap">
          <img
            src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
            alt=""
            className="comment__image"
          />
        </div>
        <div className="comment__body_wrap_container">
          <div className="comment__body_wrap">
            <b>MD Sadman Sakib</b>{" "}
            <span>
              This is insane This is insane This is insane This is insane This
              is insane This is insane This is insane This is insane This is
              insane{" "}
            </span>
          </div>
          <FontAwesomeIcon icon={like} className="comment_like_icon" />
        </div>
        <div className="comment_like_comment_info_wrap">
          <span className="comment_like_comment_info">19h</span>
          <span className="comment_like_comment_info">1 like</span>
          <span className="comment_like_comment_info">Reply</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
