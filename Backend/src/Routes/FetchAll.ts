import { EventModel } from "../db/Schema";

//@ts-ignore
export async function FetchAll(req, res) {
  try {
    const eventId = req.body.eventId;

    const event = await EventModel.findById(eventId).populate("guests");

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      guests: event.guests, // ye populated guests ka array hoga
    });
  } catch (error) {
    console.error("Error fetching guests:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
