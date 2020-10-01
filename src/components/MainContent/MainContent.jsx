import React, { useState, useEffect } from "react";
import "./MainContent.css";

import Post from "../Post/Post";
import Sidebar from "../Sidebar/Sidebar";

import { db } from "../../firebase";

function MainContent() {
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

  // console.log("Main ---> ", posts);

  return (
    <div className="mainContent__container dev">
      <div className="mainContent_wrapper container dev ">
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

            {/* {posts.map((post) => console.log("This -----> ", post.id))} */}
          </div>

          <div className="col-5 d-none d-lg-block">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
