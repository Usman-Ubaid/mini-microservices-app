import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 4005;
const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  try {
    await axios.post("http://posts-clusterip-srv:4000/events", event);
    await axios.post("http://comments-srv:4001/events", event);
    await axios.post("http://query-srv:4002/events", event);
    await axios.post("http://moderation-srv:4003/events", event);
  } catch (error) {
    console.error("Error processing event:", error.message);
    return res.status(500).send({ error: "Failed to process event" });
  }

  return res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
});
