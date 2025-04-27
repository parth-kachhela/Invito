import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landingpage } from "./page/Landingpage";
import { Dashboard } from "./page/Dashboard";
import { CreateContent } from "./components/ui/CreateContent";
import { AddGuest } from "./components/ui/AddGuest";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateContent />} />
          <Route path="/add" element={<AddGuest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
