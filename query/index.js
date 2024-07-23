import express from "express";

const app = express();

app.use(express.json());

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { commentId, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id: commentId, content });
  }
  console.log(posts);
  res.send({});
});

app.get("/events", (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log("Listening on PORT: 4002");
});
