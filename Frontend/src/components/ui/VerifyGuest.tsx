"use client";

import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export default function VerifyGuest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrResult, setQrResult] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setStream(stream); // Save stream to stop later
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    getVideo();

    // Cleanup the video stream when component unmounts
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
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
          console.log("QR Code found:", code.data);
          setQrResult(code.data);
          console.log("this is rendered..!");

          // TODO: Yaha API call bhi kar sakte ho verify guest ke liye
        }
      }
    }, 500); // 500ms me 1 baar scan karega

    return () => clearInterval(interval);
  }, []);

  // Function to stop the camera
  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      console.log("Camera stopped!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">QR Scanner 🚀</h1>
      <video ref={videoRef} className="w-full max-w-md rounded-lg shadow-md" />
      <canvas ref={canvasRef} className="hidden" />
      {qrResult && (
        <div className="mt-4 text-green-600 font-semibold">
          Result: {qrResult}
        </div>
      )}

      <div className="mt-4 py-2 px-4">
        <Button
          variant="secondray"
          size="md"
          text="Stop"
          onClick={() => {
            stopCamera(), navigate("/dashboard");
          }}
        ></Button>
      </div>
    </div>
  );
}
