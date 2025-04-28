import { response } from "express";
import { EventModel } from "../db/Schema";

//@ts-ignore
export async function CreateEvent(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const vanue = req.body.vanue;
  const date = req.body.date;
  const time = req.body.time;
  const email = req.body.email;

  try {
    const ans = await EventModel.insertMany({
      name: name,
      description: description,
      vanue: vanue,
      date: date,
      time: time,
      email: email,
    });
    const id = ans[0]._id;
    if (ans) {
      res.status(200).json({
        //@ts-ignore
        m: id,
      });
    } else {
      res.status(500).json({
        message: "internal server erro",
      });
    }
  } catch (e) {
    console.log(e);
  }
}
