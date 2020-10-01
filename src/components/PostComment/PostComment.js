import React, { useEffect, useState } from "react";
import "./PostComment";

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
import { db } from "../../firebase";

function PostComment({
  id,
  username,
  comment,
  timestamp,
  commentLiked,
  postId,
}) {
  const [postComments, setPostComments] = useState([]);
  const [postCommentLiked, setPostCommentLiked] = useState(false);

  // console.log("id ---> ", id);
  // console.log("username ---> ", username);
  // console.log("comment ---> ", comment);
  // console.log("timestamp ---> ", timestamp);
  // console.log("commentLiked ---> ", commentLiked);
  // console.log("postId ---> ", postId);

  useEffect(() => {
    // db.collection("posts")
    //   .doc(id)
    //   .collection("comments")
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) => {
    //     setPostComments(
    //       snapshot.docs.map((data) => ({ id: data.id, comment: data.data() }))
    //     );
    //   });
  }, []);

  useEffect(() => {
    db.collectionGroup("comments").onSnapshot((snapshot) => {
      // console.log(
      //   "comments",
      //   snapshot.docs.map((data) => ({
      //     id: data.id,
      //     comment: data.data().comment,
      //   }))
      // );
    });
  }, []);

  const commentLikedHandle = () => {
    // console.log("postId -> ", postId);
    // console.log("id -> ", id);
    // console.log("username -> ", username);
    // console.log("comment -> ", comment);
    // console.log("timestamp -> ", timestamp);
    // console.log("commentLiked -> ", commentLiked);

    if (!commentLiked.find((comment) => comment == username)) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(id)
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
        .doc(id)
        .set(
          {
            commentLiked: commentLiked.filter((comment) => comment != username),
          },
          { merge: true }
        );
    }
  };

  const commentLikedDetect = commentLiked.find(
    (comment) => comment == username
  );
  return (
    <div className="comment__wrap">
      <div className="comment">
        <span className="font-weight-bold">{username}</span>{" "}
        <span>{comment}</span>
      </div>
      <div onClick={commentLikedHandle}>
        {commentLikedDetect ? (
          <FontAwesomeIcon
            icon={liked}
            className="post__liked post__comment_liked"
          />
        ) : (
          <FontAwesomeIcon
            icon={like}
            className="post__like post__comment_liked"
          />
        )}
      </div>
    </div>
  );
}

export default PostComment;
