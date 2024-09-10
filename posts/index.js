import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const posts = {};

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = Math.floor(Math.random() * 1000);
  posts[id] = { id, title };

  return res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});
