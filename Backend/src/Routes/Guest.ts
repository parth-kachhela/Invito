import { EventModel, GuestModel } from "../db/Schema";
import QRCode from "qrcode";
import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

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

    const qrData = JSON.stringify({ eventId, guestId });
    const qrCodeBuffer = await QRCode.toBuffer(qrData);

    // Send Email
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "invito7878@gmail.com",
        pass: "usdz ugwi tysw qkbj",
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
    <img src="cid:qrcodeimage" alt="QR Code"/>
  `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeBuffer,
          cid: "qrcodeimage",
        },
      ],
    });

    await GuestModel.updateOne(
      {
        _id: guestId,
      },
      {
        qrcodedata: qrData,
      }
    );

    const ans1 = await EventModel.find({
      _id: eventId,
    });
    if (ans) {
      res.status(200).json({
        m: ans1,
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
