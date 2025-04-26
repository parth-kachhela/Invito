import { EventModel } from "../db/Schema";

//@ts-ignore
export async function CreateEvent(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const vanue = req.body.vanue;
  const date = req.body.date;
  const time = req.body.time;
  const expiresAt = req.body.expiresAt;

  const responese = await EventModel.insertMany({
    name: name,
    description: description,
    vanue: vanue,
    date: date,
    time: time,
    expiresAt: expiresAt,
  });
}
