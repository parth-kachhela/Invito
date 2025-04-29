"use client";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/v1/send-event-otp`, {
        email,
      });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert("Failed to send OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BACKEND_URL + "/api/v1/verify-event-otp",
        { email, otp }
      );
      //@ts-ignore
      const eventId = response.data?.eventId;

      localStorage.setItem("eventId", eventId);
      alert("Event Access Granted!");
      navigate("/dashboard");
    } catch (error) {
      alert("OTP verification failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {step === 1 ? "Verify Event Access" : "Enter OTP"}
        </motion.h2>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Event Email"
              className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 text-lg rounded-2xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Send OTP"
              )}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-3 text-lg rounded-2xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
