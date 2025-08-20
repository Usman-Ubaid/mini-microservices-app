import { useState } from "react";
import axios from "axios";

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `http://posts.com/posts/${postId}/comments`,
        {
          content: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <label htmlFor="comment" className="form-label">
            Comment:
          </label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control mb-3"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateComment;
