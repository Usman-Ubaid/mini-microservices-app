const CommentList = ({ comments }) => {
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
