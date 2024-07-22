import express from "express";

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {});
app.get("/events", (req, res) => {});

app.listen(4002, () => {
  console.log("Listening on PORT: 4002");
});
