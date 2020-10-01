import React from "react";
import "./Comment.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
// faEllipsisH,

import {
  faHeart as like,
  // faComment,
  // faPaperPlane,
  // faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { db } from "../../firebase";

function Comment({
  postId,
  commentId,
  username,
  comment,
  commentLiked,
  timestamp,
}) {
  console.log("postId --> ", postId);
  console.log("commentId --> ", commentId);
  console.log("username --> ", username);
  console.log("comment --> ", comment);
  console.log("commentLiked --> ", commentLiked);
  console.log("timestamp --> ", timestamp);

  const commentLikedHandle = () => {
    // console.log("postId -> ", postId);
    // console.log("id -> ", id);
    // console.log("username -> ", username);
    // console.log("comment -> ", comment);
    // console.log("timestamp -> ", timestamp);
    // console.log("commentLiked -> ", commentLiked);

    if (!commentLiked.find((comment) => comment === username)) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .set(
          {
            commentLiked: [...commentLiked, username],
          },
          { merge: true }
        );
    } else {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .set(
          {
            commentLiked: commentLiked.filter(
              (comment) => comment !== username
            ),
          },
          { merge: true }
        );
    }
  };

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
            <b>{username}</b> <span>{comment} </span>
          </div>
          <div onClick={commentLikedHandle}>
            {!commentLiked.find((comment) => comment === username) ? (
              <FontAwesomeIcon icon={like} className="comment_like_icon" />
            ) : (
              <FontAwesomeIcon
                icon={liked}
                className="comment_like_icon active"
              />
            )}
          </div>
        </div>
        <div className="comment_like_comment_info_wrap">
          <span className="comment_like_comment_info">
            {/* 19h */} {timeDifference(new Date(), new Date(timestamp))}
          </span>
          <span className="comment_like_comment_info">
            {commentLiked.length} like
          </span>
          <span className="comment_like_comment_info">Reply</span>
        </div>
      </div>
    </div>
  );
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
export default Comment;
