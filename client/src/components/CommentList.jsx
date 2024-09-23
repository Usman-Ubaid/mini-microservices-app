const CommentList = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation.";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected.";
    }
    return <li key={comment.commentId}>{content}</li>;
  });

  return (
    <div>
      <p className="fst-italic">{comments.length} comment(s)</p>
      <ul>{renderComments}</ul>
    </div>
  );
};

export default CommentList;
