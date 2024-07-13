import axios from "axios";
import { useEffect, useState } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
    };
    fetchComments();
  }, [postId]);

  const renderedComments = comments.map((comment) => (
    <li key={comment.commentId}>{comment.content}</li>
  ));

  return (
    <div>
      <h5>{comments.length} comment(s)</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
