import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 4002;

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    const post = { id, title, comments: [] };

    posts[id] = post;
  }

  if (type === "CommentCreated") {
    const { commentId, content, postId, status } = data;
    const post = posts[postId];
    const comment = { commentId, content, status };
    post.comments.push(comment);
  }

  if (type === "CommentUpdated") {
    console.log("hello");
    const { commentId, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(
      (comment) => comment.commentId === commentId
    );
    comment.status = status;
    comment.content = content;
  }
  // console.log(posts);
  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});
