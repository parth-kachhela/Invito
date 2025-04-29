// Get Event Details API

import { EventModel } from "../db/Schema";

export const getEventDetails = async (req: any, res: any) => {
  try {
    const { eventId } = req.query;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ event });
  } catch (error) {
    console.error("Error fetching event details", error);
    return res.status(500).json({ error: "Failed to fetch event details" });
  }
};
