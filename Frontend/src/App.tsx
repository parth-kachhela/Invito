import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { CreateEvent } from "./components/ui/CreateEvent";
import { AddGuest } from "./components/ui/AddGuest";
import VerifyGuest from "./components/ui/VerifyGuest";
import Landingpage from "./page/Landingpage";
import Dashboard from "./page/Dashboard";
import VerifyOtp from "./components/ui/VerifyOtp";
//@ts-ignore

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/add" element={<AddGuest />} />
          <Route path="/verify" element={<VerifyGuest />} />
          <Route path="/otp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
