import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { CreateEvent } from "./components/ui/CreateEvent";
import { AddGuest } from "./components/ui/AddGuest";
import VerifyGuest from "./components/ui/VerifyGuest";
import Landingpage from "./page/Landingpage";
import Dashboard from "./page/Dashboard";
import VerifyOtp from "./components/ui/VerifyOtp";
import { ProtectedRoute } from "./components/ui/ProtectedRoute"; // 👈 yeh import add karo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/otp" element={<VerifyOtp />} />
        <Route path="/create" element={<CreateEvent />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddGuest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <ProtectedRoute>
              <VerifyGuest />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="text-center text-red-600 p-10 text-xl">
              404 - Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
