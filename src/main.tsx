import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import PortraitsPage from "./pages/PortraitsPage.tsx";
import VisualStoriesPage from "./pages/VisualStoriesPage.tsx";
import ArchitecturePage from "./pages/ArchitecturePage.tsx";
import WhoWeArePage from "./pages/WhoWeArePage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/WhiteCoatLab">
      {" "}
      {/* 👈 Add this line */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portraits" element={<PortraitsPage />} />
        <Route path="/visual-stories" element={<VisualStoriesPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
      </Routes>
    </Router>
  </StrictMode>
);
