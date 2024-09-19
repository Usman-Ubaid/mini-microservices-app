import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

const port = 4003;

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { commentId, content, postId } = data;

    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { commentId, content, status, postId },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});
