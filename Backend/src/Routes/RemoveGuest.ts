import mongoose from "mongoose";
import { EventModel, GuestModel } from "../db/Schema";

//@ts-ignore
export async function RemoveGuest(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid guestId" });
    }

    const guest = await GuestModel.findById(id);
    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Guest not found" });
    }

    const eventId = guest.eventId;

    await EventModel.findByIdAndUpdate(eventId, {
      $pull: { guests: id },
    });
    await GuestModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Guest removed successfully!",
    });
  } catch (error) {
    console.error("Error removing guest:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
