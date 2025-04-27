import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Dashboard } from "./page/Dashboard";
import { CreateEvent } from "./components/ui/CreateEvent";
import { AddGuest } from "./components/ui/AddGuest";
import VerifyGuest from "./components/ui/VerifyGuest";
import Landingpage from "./page/Landingpage";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
