import React, { useState, useEffect } from "react";
import "./Post.css";

import Comment from "../Comment/Comment";

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
import { db } from "../../firebase";

function Post({
  id,
  username,
  postImage,
  postTags,
  profileImage,
  likes,
  comments,
}) {
  const [postMoreModal, setPostMoreModal] = useState(false);
  const [postContentModal, setPostContentModal] = useState(false);
  const [postLiked, setPostLiked] = useState(false);

  const postOpen = () => setPostMoreModal(true);
  const postClose = () => setPostMoreModal(false);
  const postContentOpen = () => setPostContentModal(true);
  const postContentClose = () => setPostContentModal(false);

  // console.log(id, username, postImage, postTags, profileImage, likes, comments);

  const likeHandle = () => {
    if (!likes.find((like) => like == username)) {
      console.log("Haha");
      db.collection("posts")
        .doc(id)
        .set(
          {
            likes: [...likes, username],
          },
          { merge: true }
        );
    } else {
      console.log(likes.find((like) => like == username));

      db.collection("posts")
        .doc(id)
        .set(
          {
            likes: likes.filter((like) => like != username),
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
              <div className="dev" style={{ height: "100%" }}>
                <img
                  src="https://static.scientificamerican.com/sciam/cache/file/4E0744CD-793A-4EF8-B550B54F7F2C4406.jpg"
                  className="post__modalContent_img"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 pl-lg-0 ">
              <div className="post__contentModal_content_wrap">
                <div className="post__contentModal_content_wrap_header dev">
                  <div className="post__contentModal_content_wrap_header_container">
                    <div className="post__contentModal_content_wrap_header_img_wrap">
                      <img
                        src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
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
                <div className="post__contentModal_content_wrap_content dev">
                  <div className="post__contentModal_content_wrap_content_container">
                    {/* Comment */}
                    <div className="post__contentModal_content_profile_wrap">
                      <div className="post__contentModal_content_profile">
                        <img
                          src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
                          alt=""
                          className="post__contentModal_content_profile_img"
                        />
                      </div>
                      <div style={{ marginLeft: "50px", paddingRight: "20px" }}>
                        <b>MD Sadman Sakib</b>{" "}
                        <span>
                          Hi Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Voluptates necessitatibus aspernatur voluptatum
                          quod quae quidem tempora ad eos fuga deleniti quas,
                          fugit labore dolor impedit placeat, recusandae
                          corrupti veniam vitae. Veniam earum dolorem possimus
                          quo! Nostrum quia ipsam, minima eius recusandae
                          provident ipsa distinctio corporis, veritatis atque
                          adipisci illo laboriosam.
                        </span>
                      </div>
                      <div className="post__contentModal_content_profile_ago">
                        1d
                      </div>
                    </div>
                    {/* Comment */}
                    <Comment />
                  </div>
                </div>
                <div className="post__contentModal_content_wrap_footer dev">
                  <div className="post__contentModal_content_wrap_footer_wrap">
                    <div className="post__contentModal_content_wrap_footer_wrap_like_info">
                      <div className="post__contentModal_content_wrap_footer_wrap_like_info_item">
                        <FontAwesomeIcon icon={liked} className="post__liked" />
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
                    2000 likes
                  </b>
                  <div className="post__contentModal_content_wrap_footer_wrap_like_info_ago">
                    1 DAY AGO
                  </div>
                  <div className="post__comment_panel">
                    <input
                      type="text"
                      className="post__comment_panel_input"
                      placeholder="Add a comment..."
                    />
                    <button className="post__comment_panel_button">Post</button>
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
              <img
                src="https://i.dailymail.co.uk/i/newpix/2018/04/11/21/4B0BF54900000578-5605081-Testing_an_idea_A_user_on_a_bodybuilding_forum_revealed_how_he_c-m-58_1523478697639.jpg"
                alt=""
                className="post__img"
              />
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
                {likes.find((like) => like == username) ? (
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
              <span className="font-weight-bold">MD Sadman Sakib</span>{" "}
              <span>WoW This is a Nice Pic</span>
            </div>
          </div>

          <button className="post__viewComments" onClick={postContentOpen}>
            View all {comments.length} comments
          </button>

          <PostComment />
          <PostComment />
          <PostComment />

          <p className="mt-1 mb-0 post__viewComments post_ago">2 Days Ago</p>
        </div>
        <div className="post__comment_panel">
          <input
            type="text"
            className="post__comment_panel_input"
            placeholder="Add a comment..."
          />
          <button className="post__comment_panel_button">Post</button>
        </div>
      </div>
    </div>
  );
}

function PostComment() {
  const [postCommentLiked, setPostCommentLiked] = useState(false);
  return (
    <div className="comment__wrap">
      <div className="comment">
        <span className="font-weight-bold">MD Sadman Sakib</span>{" "}
        <span>WoW This is a Nice Pic</span>
      </div>
      <div onClick={() => setPostCommentLiked(!postCommentLiked)}>
        {postCommentLiked ? (
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

export default Post;
