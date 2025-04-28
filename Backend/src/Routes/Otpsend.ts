import { EventModel } from "../db/Schema";
import { createTransport } from "nodemailer";
import otpGenerator from "otp-generator";
import { EMAIL_USER, EMAIL_PASS } from "../config";

const eventOtpStore: { [email: string]: string } = {};

export async function Otpsend(req: any, res: any) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    const event = await EventModel.findOne({ email: email });

    if (!event) {
      return res.status(404).json({
        message: "Event not found with this email",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    eventOtpStore[email] = otp;

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "invito7878@gmail.com",
        pass: "usdz ugwi tysw qkbj",
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your Event OTP Code",
      text: `Your OTP code to access your event is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP sent successfully!",
    });
  } catch (error) {
    console.error("Error in sending event OTP:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { eventOtpStore };
