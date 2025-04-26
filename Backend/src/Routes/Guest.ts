import { EventModel, GuestModel } from "../db/Schema";
import QRCode from "qrcode";
import nodemailer from "nodemailer";

//@ts-ignore
export async function AddGuest(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const eventId = req.body.eventId;

  try {
    // Step 1: Save guest in DB
    const ans = await GuestModel.insertMany({
      name: name,
      email: email,
      eventId: eventId,
    });

    const guestId = ans[0]._id;

    // Step 2: Generate QR Code
    const qrData = JSON.stringify({ eventId, guestId });
    const qrCodeImageUrl = await QRCode.toDataURL(qrData);

    // Step 3: Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "invito7878@gmail.com", // <-- apna gmail id daal
        pass: "usdz ugwi tysw qkbj", // <-- Gmail app password use karna
      },
    });

    await transporter.sendMail({
      from: "invito7878@gmail.com",
      to: email,
      subject: "You are Invited to an Event 🎉",
      html: `
        <h1>You're Invited!</h1>
        <p><strong>Venue:</strong> Check event details.</p>
        <p><strong>Description:</strong> Enjoy the event!</p>
        <p><strong>Date & Time:</strong> Check event date/time.</p>
        <p>Show this QR code at the entrance:</p>
        <img src="${qrCodeImageUrl}" alt="QR Code"/>
      `,
    });

    await GuestModel.updateOne(
      {
        _id: guestId,
      },
      {
        qrcodedata: qrCodeImageUrl,
      }
    );
    // Step 4: Return Response
    if (ans) {
      res.status(200).json({
        m: guestId,
        message: "Guest added and email sent..!",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong!" });
  }
}
