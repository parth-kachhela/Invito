// Scanner.tsx

import { useState } from "react";
import QrReader from "react-qr-reader";
// import axios from "axios";

const Scanner = () => {
  const [scanResult, setScanResult] = useState("");

  const handleScan = async (data: any) => {
    if (data) {
      console.log("QR Data:", data);
      setScanResult(data);

      // Step 1: Parse QR data
      const { eventId, guestId } = JSON.parse(data);
      console.log(eventId, guestId);
      try {
        // Step 2: Send to backend
        // const response = await axios.post(
        //   "http://localhost:3000/api/verify-guest",
        //   {
        //     eventId,
        //     guestId,
        //   }
        // );
        //@ts-ignore
        alert(response.data?.message);
      } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.message || "Verification failed");
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Scan your QR Code 🎯</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />
      {scanResult && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Scanned Data:</strong> {scanResult}
        </div>
      )}
    </div>
  );
};

export default Scanner;
