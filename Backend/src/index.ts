import express from "express";
import { CreateEvent } from "./Routes/CreateEvent";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config";
const app = express();

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("db connected..!");
  })
  .catch((e) => {
    console.log("db Error : " + e);
  });

app.get("/", (req, res) => {
  res.json({
    message: "hye there",
  });
});

app.post("/api/v1/create", CreateEvent);

app.listen(3000, () => {
  console.log("app is listing ..!");
});
