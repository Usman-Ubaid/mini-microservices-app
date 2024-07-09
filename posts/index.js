import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const title = req.body.title;
  const id = uuidv4();
  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on Port: 4000");
});
