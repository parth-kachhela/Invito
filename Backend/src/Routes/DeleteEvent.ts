// Event Delete API

import { EventModel, GuestModel } from "../db/Schema";

export const deleteEvent = async (req: any, res: any) => {
  try {
    const { eventId } = req.params;

    // Step 1: Delete all guests related to this event
    await GuestModel.deleteMany({ eventId: eventId });

    // Step 2: Delete the event itself
    await EventModel.findByIdAndDelete(eventId);

    return res
      .status(200)
      .json({ message: "Event and guests deleted successfully" });
  } catch (error) {
    console.error("Error deleting event", error);
    return res.status(500).json({ error: "Failed to delete event" });
  }
};
