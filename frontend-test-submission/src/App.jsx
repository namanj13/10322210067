import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatisticsPage from "./pages/StatisticsPage";
import RedirectHandler from "./pages/RedirectHandler";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}
