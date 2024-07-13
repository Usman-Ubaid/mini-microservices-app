import axios from "axios";
import { useState } from "react";

const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");

  const createComment = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setContent("");
  };

  return (
    <div>
      <h6>New Comment</h6>

      <form onSubmit={createComment}>
        <input
          type="text"
          className="form-control mb-1"
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-light">Submit</button>
      </form>
    </div>
  );
};

export default CreateComment;
