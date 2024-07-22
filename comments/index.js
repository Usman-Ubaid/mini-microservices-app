import express from "express";
import { v4 as uuid4 } from "uuid";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  return res.status(200).send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = uuid4();
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { commentId, content, postId: req.params.id },
  });

  return res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on PORT:4001");
});
