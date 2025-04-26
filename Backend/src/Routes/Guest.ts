import { EventModel, GuestModel } from "../db/Schema";

//@ts-ignore
export async function AddGuest(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const eventId = req.body.eventId;

  try {
    const ans = await GuestModel.insertMany({
      name: name,
      email: email,
      eventId: eventId,
    });
    const id = ans[0]._id;
    if (ans) {
      res.status(200).json({
        //@ts-ignore
        m: id,
        message: "Guest added..!",
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
