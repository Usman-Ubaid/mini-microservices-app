import { useState } from "react";
import axios from "axios";
import PostList from "./PostList";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const handlePostSubmit = async () => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/posts",
        {
          title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h2>CreatePost</h2>
        <form onSubmit={handlePostSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control mb-3"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      <hr />
      <div>
        <h2>Posts</h2>
        <PostList />
      </div>
    </div>
  );
};

export default CreatePost;
