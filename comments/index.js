import express from "express";
import { v4 as uuid4 } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  return res.status(200).send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = uuid4();
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ commentId, content });
  commentsByPostId[req.params.id] = comments;

  return res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on PORT:4001");
});
