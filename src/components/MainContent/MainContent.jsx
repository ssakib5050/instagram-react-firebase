import React, { useState, useEffect } from "react";
import "./MainContent.css";

import Post from "../Post/Post";
import Sidebar from "../Sidebar/Sidebar";

import { db } from "../../firebase";

function MainContent({ photoURL, username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // setPosts(snapshot.docs.map((doc) => doc.data()));
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="mainContent__container">
      <div className="mainContent_wrapper container ">
        <div className="row">
          <div className="col-12 col-lg-7">
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                username={post.post.username}
                postImage={post.post.postImage}
                postCaption={post.post.postCaption}
                postTags={post.post.postTags}
                profileImage={post.post.profileImage}
                likes={post.post.likes}
                comments={post.post.comments}
                timestamp={post.post.timestamp}
              />
            ))}
          </div>

          <div className="col-5 d-none d-lg-block">
            <Sidebar photoURL={photoURL} username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
