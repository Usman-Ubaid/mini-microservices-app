import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const port = 4001;

const commentsByPostId = {};

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const commentId = Math.floor(Math.random() * 1000);
  const comment = { commentId, content, status: "pending" };

  if (!commentsByPostId[id]) {
    commentsByPostId[id] = [];
  }

  commentsByPostId[id].push(comment);

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      commentId,
      content,
      postId: id,
      status: "pending",
    },
  });

  return res.status(201).send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { commentId, postId, content, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.commentId === commentId);
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { commentId, postId, content, status },
    });
  }

  res.send({});
});

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  return res.send(commentsByPostId[id] || []);
});

app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
});
