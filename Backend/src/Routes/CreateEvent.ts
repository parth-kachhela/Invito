import { EventModel } from "../db/Schema";

//@ts-ignore
export async function CreateEvent(req, res) {
  const { name, description, vanue, date, time, email } = req.body;

  try {
    const emailRes = await EventModel.findOne({ email });

    if (emailRes) {
      return res.status(409).json({
        message: "Your event is already created by this email",
      });
    }

    const newEvent = await EventModel.create({
      name,
      description,
      vanue,
      date,
      time,
      email,
    });

    return res.status(201).json({
      m: newEvent._id,
    });
  } catch (e) {
    console.error("CreateEvent Error:", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
