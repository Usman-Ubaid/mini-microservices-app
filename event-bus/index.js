import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const port = 4005;

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  return res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
});
