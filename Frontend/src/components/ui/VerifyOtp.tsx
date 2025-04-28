import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post(BACKEND_URL + "/api/v1/send-event-otp", {
        email,
      });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert("Failed to send OTP");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/v1/verify-event-otp",
        { email, otp }
      );
      //@ts-ignore
      const eventId = response.data?.eventId;

      localStorage.setItem("eventId", eventId); // bas yehi important hai
      alert("Event Access Granted!");
      navigate("/dashboard");
    } catch (error) {
      alert("OTP verification failed");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {step === 1 && (
        <div>
          <h2>Enter Event Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter event email"
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}
