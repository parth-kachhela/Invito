import { EventModel } from "../db/Schema";
import { eventOtpStore } from "./Otpsend";

export async function Otpverify(req: any, res: any) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP are required",
    });
  }

  try {
    const savedOtp = eventOtpStore[email];

    if (!savedOtp) {
      return res.status(400).json({
        message: "OTP expired or not requested",
      });
    }

    if (savedOtp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const event = await EventModel.findOne({ email });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Success
    res.status(200).json({
      message: "OTP verified successfully!",
      eventId: event._id,
      eventData: event, // Optional: send full event data if needed
    });
  } catch (error) {
    console.error("Error in verifying event OTP:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
