import express, { json } from "express";
import { CreateEvent } from "./Routes/CreateEvent";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URL } from "./config";
import { AddGuest } from "./Routes/Guest";
import { VerifyGuest } from "./Routes/VerifyGuest";
const app = express();
app.use(express.json());
app.use(cors());
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
app.post("/api/v1/add", AddGuest);
app.post("/api/v1/verify", VerifyGuest);

app.listen(3000, () => {
  console.log("app is listing ..!");
});
