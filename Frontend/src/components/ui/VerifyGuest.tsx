"use client";

import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";

export default function VerifyGuest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrResult, setQrResult] = useState<string>("");

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    getVideo();
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

          // TODO: Yaha API call bhi kar sakte ho verify guest ke liye
        }
      }
    }, 500); // 500ms me 1 baar scan karega

    return () => clearInterval(interval);
  }, []);

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
    </div>
  );
}
