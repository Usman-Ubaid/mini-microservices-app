import express from "express";

const app = express();
app.use(express.json());

const port = 4001;

const commentsByPostId = {};

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const commentId = Math.floor(Math.random() * 1000);
  const comment = { commentId, content };

  if (!commentsByPostId[id]) {
    commentsByPostId[id] = [];
  }

  commentsByPostId[id].push(comment);
  return res.status(201).send(commentsByPostId);
});

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  return res.send(commentsByPostId[id] || []);
});

app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
});
