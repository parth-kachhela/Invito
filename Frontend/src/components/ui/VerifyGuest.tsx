"use client";

import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
import { MyButton } from "./MyButton";

export default function VerifyGuest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [guestName, setGuestName] = useState<string | undefined>(undefined);
  const [guestEmail, setGuestEmail] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isScanning, setIsScanning] = useState(true);
  const navigate = useNavigate();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasScannedRef = useRef(false);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      console.log("Camera stopped!");
    }
  };

  const resetScanner = () => {
    setGuestName(undefined);
    setGuestEmail(undefined);
    setErrorMessage(undefined);
    setIsScanning(true);
    hasScannedRef.current = false;
    startCamera();
  };

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play();
        setStream(newStream);
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!isScanning) return;

    intervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && !hasScannedRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          hasScannedRef.current = true; // Prevent multiple scans
          setIsScanning(false);

          // STOP camera and interval immediately
          if (intervalRef.current) clearInterval(intervalRef.current);
          stopCamera();

          const parsedData = JSON.parse(code.data);
          const eventId = parsedData.eventId;
          const guestId = parsedData.guestId;

          axios
            .post(`${BACKEND_URL}/api/v1/verify`, {
              guestId,
              eventId,
            })
            .then((ans) => {
              //@ts-ignore
              setGuestName(ans.data.name);
              //@ts-ignore
              setGuestEmail(ans.data.email);
              setErrorMessage(undefined);
            })
            .catch((e) => {
              console.error("Verify error:", e);
              setGuestName(undefined);
              setGuestEmail(undefined);
              setErrorMessage("Guest not verified");
            });
        }
      }
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">QR Scanner 🚀</h1>

      <video ref={videoRef} className="w-full max-w-md rounded-lg shadow-md" />
      <canvas ref={canvasRef} className="hidden" />

      {guestName ? (
        <div className="mt-6 text-green-600 font-semibold text-center">
          ✅ Guest Verified! <br />
          Name: {guestName} <br />
          Email: {guestEmail}
        </div>
      ) : errorMessage ? (
        <div className="mt-6 text-red-500 font-semibold text-center">
          ❌ {errorMessage}
        </div>
      ) : (
        <div className="mt-6 text-blue-500 font-semibold">
          Scanning for QR Code...
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <MyButton
          variant="secondray"
          size="md"
          text="Scan Again"
          onClick={resetScanner}
        />
        <MyButton
          variant="secondray"
          size="md"
          text="Stop"
          onClick={() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            stopCamera();
            navigate("/dashboard");
          }}
        />
      </div>
    </div>
  );
}
