import { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await axios.get("http://posts.com:4002/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        key={post.id}
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-wrap flex-row justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
