import React, { useState, useEffect } from "react";
import "./Post.css";

import Comment from "../Comment/Comment";
import PostComment from "../PostComment/PostComment";

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
import { Modal } from "react-bootstrap";
// import firebase from "firebase";
import { db } from "../../firebase";

function Post({
  postId,
  username,
  postImage,
  postCaption,
  postTags,
  profileImage,
  likes,
  comments,
  timestamp,
}) {
  const [postMoreModal, setPostMoreModal] = useState(false);
  const [postContentModal, setPostContentModal] = useState(false);
  // const [postLiked, setPostLiked] = useState(false);
  const [postCommentInput, setPostCommentInput] = useState("");
  const [postComments, setPostComments] = useState([]);

  const postOpen = () => setPostMoreModal(true);
  const postClose = () => setPostMoreModal(false);
  const postContentOpen = () => setPostContentModal(true);
  const postContentClose = () => setPostContentModal(false);

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPostComments(
          snapshot.docs.map((data) => ({
            id: data.id,
            comment: data.data(),
            postId: postId,
          }))
        );
      });

    // db.collectionGroup("comments").onSnapshot((snapshot) =>
    //   console.log(snapshot.docs.map((data) => data.data()))
    // );
  }, []);

  // console.log("Sakib -> ", postComments);

  // console.log(id, username, postImage, postTags, profileImage, likes, comments);
  // console.log("id --> ", id);
  // console.log("username --> ", username);
  // console.log("postImage --> ", postImage);
  // console.log("postCaption --> ", postCaption);
  // console.log("profileImage --> ", profileImage);
  // console.log("likes --> ", likes);
  // console.log("comments --> ", comments);

  const likeHandle = () => {
    if (!likes.find((like) => like === username)) {
      db.collection("posts")
        .doc(postId)
        .set(
          {
            likes: [...likes, username],
          },
          { merge: true }
        );
    } else {
      // console.log(likes.find((like) => like == username));

      db.collection("posts")
        .doc(postId)
        .set(
          {
            likes: likes.filter((like) => like !== username),
          },
          { merge: true }
        );
    }
    // console.log(
    //   "This ---> ",
    //   ["taskin", "Sajib", "ssakib4050"].find((like) => like == "ssakib4050")
    // );
    // if(username == ""){

    // }
    // db.collection("posts")
    //   .doc(id)
    //   .set(
    //     {
    //       likes: [...likes, { name: "ssakib4050" }],
    //     },
    //     { merge: true }
    //   );
  };

  const commentHandle = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      // .doc(id)
      .add({
        username: username,
        comment: postCommentInput,
        timestamp: Date.now(),
        commentLiked: [],
      });
    setPostCommentInput("");
  };

  // id={post.id}
  // username={post.post.username}
  // postImage={post.post.postImage}
  // postTags={post.post.postTags}
  // profileImage={post.post.profileImage}
  // likes={post.post.likes}
  // comments={post.post.comments}

  return (
    <div className="post__container">
      <Modal
        show={postContentModal}
        onHide={postContentClose}
        animation={false}
        size="xl"
        centered
        className="post__contentModal"
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-lg-8 pr-lg-0">
              <div className="" style={{ height: "100%" }}>
                <img
                  src={postImage}
                  style={{ height: "100%", width: "100%" }}
                  alt={postImage}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 pl-lg-0 ">
              <div className="post__contentModal_content_wrap">
                <div className="post__contentModal_content_wrap_header">
                  <div className="post__contentModal_content_wrap_header_container">
                    <div className="post__contentModal_content_wrap_header_img_wrap">
                      <img
                        src={profileImage}
                        alt=""
                        className="post__contentModal_content_wrap_header_img"
                      />
                    </div>
                    <b className="post__contentModal_content_wrap_header_username">
                      {username}
                    </b>
                  </div>
                  <div
                    className="post__contentModal_content_wrap_header_moreButton"
                    onClick={postOpen}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                </div>
                <div className="post__contentModal_content_wrap_content">
                  <div className="post__contentModal_content_wrap_content_container">
                    {/* Comment */}
                    {/* <div className="post__contentModal_content_profile_wrap">
                      <div className="post__contentModal_content_profile">
                        <img
                          src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
                          alt=""
                          className="post__contentModal_content_profile_img"
                        />
                      </div>
                      <div style={{ marginLeft: "50px", paddingRight: "20px" }}>
                        <b>{username}</b> <span>{postCaption}</span>
                      </div>
                      <div className="post__contentModal_content_profile_ago">
                        {"timestamp"}
                      </div>
                    </div> */}
                    {/* Comment */}

                    {postComments.map((comment) => (
                      <Comment
                        key={comment.id}
                        postId={postId}
                        commentId={comment.id}
                        username={comment.comment.username}
                        profileImage={profileImage}
                        comment={comment.comment.comment}
                        commentLiked={comment.comment.commentLiked}
                        timestamp={comment.comment.timestamp}
                      />
                    ))}

                    {/* {postComments.map((comments) => console.log(comments))} */}
                  </div>
                </div>
                <div className="post__contentModal_content_wrap_footer ">
                  <div className="post__contentModal_content_wrap_footer_wrap">
                    <div className="post__contentModal_content_wrap_footer_wrap_like_info">
                      <div
                        className="post__contentModal_content_wrap_footer_wrap_like_info_item"
                        onClick={likeHandle}
                      >
                        {likes.find((like) => like === username) ? (
                          <FontAwesomeIcon
                            icon={liked}
                            className="post__liked"
                          />
                        ) : (
                          <FontAwesomeIcon icon={like} className="post__like" />
                        )}
                        {/* <FontAwesomeIcon icon={liked} className="post__liked" /> */}
                      </div>

                      <div className="post__contentModal_content_wrap_footer_wrap_like_info_item">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="post__like"
                        />
                      </div>
                      <div className="post__contentModal_content_wrap_footer_wrap_like_info_item">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="post__like"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="post__like"
                        />
                      </div>
                    </div>
                  </div>
                  <b className="post__contentModal_content_wrap_footer_wrap_like_info_timeline">
                    {likes.length} likes
                  </b>
                  <div className="post__contentModal_content_wrap_footer_wrap_like_info_ago">
                    1 DAY AGO
                  </div>
                  <div className="post__comment_panel">
                    <form action="" style={{ width: "100%", display: "flex" }}>
                      <input
                        type="text"
                        className="post__comment_panel_input"
                        placeholder="Add a comment..."
                        onChange={(e) => setPostCommentInput(e.target.value)}
                        value={postCommentInput}
                      />
                      <button
                        className="post__comment_panel_button"
                        onClick={commentHandle}
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={postMoreModal}
        onHide={postClose}
        centered
        className="post_modal_content_wrap"
      >
        <Modal.Body className="post__modal_body">
          <div className="post__modal_body_wrap">
            <button className="post__modal_body_wrap_button_danger">
              Report
            </button>
            <button className="post__modal_body_wrap_button_danger">
              Unfollow
            </button>
            <button>Go to post</button>
            <button>Share</button>
            <button>Copy Link</button>
            <button>Embed</button>
            <button onClick={postClose}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="post__wrapper">
        <div className="post__header">
          <div className="post__image_username">
            <div className="post__img_wrap">
              <img src={profileImage} alt="" className="post__img" />
            </div>
            <div className="post__username">
              <b>{username}</b>
            </div>
          </div>

          <div className="post__moreMenu" onClick={postOpen}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
        <div>
          <img src={postImage} alt="" className="post__image" />
        </div>
        <div className="post__info_wrap">
          <div className="post__info">
            <div className="post_info_like_comment">
              <div className="post__info_liked" onClick={likeHandle}>
                {likes.find((like) => like === username) ? (
                  <FontAwesomeIcon icon={liked} className="post__liked" />
                ) : (
                  <FontAwesomeIcon icon={like} className="post__like" />
                )}
              </div>

              <div className="post__info_comment" onClick={postContentOpen}>
                <FontAwesomeIcon icon={faComment} className="post__like" />
              </div>

              <div className="post__info_share">
                <FontAwesomeIcon icon={faPaperPlane} className="post__like" />
              </div>
            </div>
            <div>
              <div className="post__info_share">
                <FontAwesomeIcon icon={faBookmark} className="post__like" />
              </div>
            </div>
          </div>
          <p className="mt-2 mb-2">{likes.length} likes</p>

          <div className="comment__wrap">
            <div className="comment">
              <span className="font-weight-bold">{username}</span>{" "}
              <span>{postCaption}</span>
            </div>
          </div>

          <button className="post__viewComments" onClick={postContentOpen}>
            View all {postComments.length} comments
          </button>

          {/* {console.log("comment->", comments)} */}
          {postComments.slice(0, 3).map(({ id, comment }) => (
            <PostComment
              key={id}
              id={id}
              postId={postId}
              username={comment.username}
              comment={comment.comment}
              timestamp={comment.timestamp}
              commentLiked={comment.commentLiked}
            />
          ))}

          {/* {postComments.slice(0, 3).map(({ id, comment }) => console.log())} */}

          <p className="mt-1 mb-0 post__viewComments post_ago">
            {timestamp
              ? timeDifference(new Date(), new Date(timestamp.seconds * 1000))
              : ""}
          </p>
        </div>
        <div className="post__comment_panel">
          <form action="" style={{ width: "100%", display: "flex" }}>
            <input
              type="text"
              className="post__comment_panel_input"
              placeholder="Add a comment..."
              onChange={(e) => setPostCommentInput(e.target.value)}
              value={postCommentInput}
            />
            <button
              className="post__comment_panel_button"
              onClick={commentHandle}
            >
              Post
            </button>
          </form>
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

export default Post;
