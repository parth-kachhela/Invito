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
    const event = await EventModel.find({
      _id: eventId,
    });
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
    <h1>It's ${event[0].name}</h1>
    <p><strong>Venue:</strong> ${event[0].vanue}</p>
    <p><strong>Description:</strong> ${event[0].description}</p>
    <p><strong>Date & Time:</strong> ${event[0].date} and Time : ${event[0].time}}</p>
    <p>This is your QRcode please show this for your entry :</p>
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

    await EventModel.findByIdAndUpdate(eventId, {
      $push: { guests: guestId },
    });

    if (ans) {
      res.status(200).json({
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
