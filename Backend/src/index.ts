import express from "express";
import { CreateEvent } from "./Routes/CreateEvent";
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hye there",
  });
});

app.post("/api/v1/create", CreateEvent);

app.listen(3000, () => {
  console.log("app is listing ..!");
});
