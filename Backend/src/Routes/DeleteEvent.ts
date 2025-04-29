// Event Delete API

import { EventModel, GuestModel } from "../db/Schema";

export const deleteEvent = async (req: any, res: any) => {
  try {
    const { eventId } = req.params;

    await GuestModel.deleteMany({ eventId: eventId });

    await EventModel.findByIdAndDelete(eventId);

    return res
      .status(200)
      .json({ message: "Event and guests deleted successfully" });
  } catch (error) {
    console.error("Error deleting event", error);
    return res.status(500).json({ error: "Failed to delete event" });
  }
};
