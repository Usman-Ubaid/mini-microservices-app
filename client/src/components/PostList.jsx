import { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const data = async () => {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
    };

    data();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        key={post?.id}
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <h3>{post?.title}</h3>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
