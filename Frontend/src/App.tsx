import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landingpage } from "./page/Landingpage";
import { Dashboard } from "./page/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
