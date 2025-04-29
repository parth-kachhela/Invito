import express, { json } from "express";
import { CreateEvent } from "./Routes/CreateEvent";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URL } from "./config";
import { AddGuest } from "./Routes/Guest";
import { VerifyGuest } from "./Routes/VerifyGuest";
import { FetchAll } from "./Routes/FetchAll";
import { RemoveGuest } from "./Routes/RemoveGuest";
import { Otpsend } from "./Routes/Otpsend";
import { Otpverify } from "./Routes/Otpverify";
import { getEventDetails } from "./Routes/getEventDetails";
import { deleteEvent } from "./Routes/DeleteEvent";
import { requireEventId } from "./middleware/requireEventId";
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

app.get("/api/v1/all", FetchAll);
app.get("/api/v1/event/details", getEventDetails);
app.post("/api/v1/create", CreateEvent);
app.post("/api/v1/add", requireEventId, AddGuest);
app.post("/api/v1/verify", requireEventId, VerifyGuest);
app.post("/api/v1/send-event-otp", Otpsend);
app.post("/api/v1/verify-event-otp", Otpverify);
app.delete("/api/v1/remove/:id", requireEventId, RemoveGuest);
app.delete("/api/v1/event/:eventId", requireEventId, deleteEvent);

app.listen(3000, () => {
  console.log("app is listing ..!");
});
