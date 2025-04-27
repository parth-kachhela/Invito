import { GuestModel } from "../db/Schema";

//@ts-ignore
export const VerifyGuest = async (req, res) => {
  const { eventId, guestId } = req.body;

  try {
    const Guest = await GuestModel.findOne({
      eventId: eventId,
      _id: guestId,
    });

    if (Guest) {
      if (Guest.hasCheckedIn) {
        return res.status(400).json({ message: "Guest already checked in!" });
      }

      await GuestModel.updateOne({ _id: guestId }, { hasCheckedIn: true });

      res.status(200).json({
        name: Guest.name,
        email: Guest.email,
      });
    } else {
      res.status(404).json({
        message: "Guest not found for this event!",
      });
    }
  } catch (e) {
    console.log("internal server error ..!" + e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
