import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const posts = {};

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = Math.floor(Math.random() * 1000);
  posts[id] = { id, title };

  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });
  } catch (err) {
    console.error("❌ Failed to notify event bus:", err);
  }

  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.listen(port, () => {
  console.log("v20");
  console.log(`Listening on PORT: ${port}`);
});
