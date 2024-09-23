import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const port = 4002;

const posts = {};

const handleEvent = (type, data) => {
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
    const { commentId, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(
      (comment) => comment.commentId === commentId
    );
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(port, async () => {
  console.log(`Listening to PORT: ${port}`);

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing Event: ", event.type);

    handleEvent(event.type, event.data);
  }
});
