import { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const renderComments = comments.map((comment) => {
    return <li key={comment.commentId}>{comment.content}</li>;
  });
  return (
    <div>
      <p className="fst-italic">{comments.length} comment(s)</p>
      <ul>{renderComments}</ul>
    </div>
  );
};

export default CommentList;
