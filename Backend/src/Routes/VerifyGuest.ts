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
      const check = await GuestModel.updateOne(
        {
          _id: guestId,
        },
        {
          hasCheckedIn: true,
        }
      );
      res.status(200).json({
        name: Guest.name,
        email: Guest.email,
        hasCheckedIn: check,
      });
    }
  } catch (e) {
    console.log("internal server error ..!" + e);
  }
};
