// client/src/App.jsx
import React from "react";
import "./App.css";
import SpiderChart from "./SpiderChart.jsx";

export default function App() {
  const sampleData = {
    Action: 0.8,
    Comedy: 0.6,
    Drama: 0.7,
    Horror: 0.3,
    Romance: 0.5,
    "Sci-Fi": 0.9,
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Movie Taste Visualiser</h1>
      <SpiderChart data={sampleData} />
      <p>Hover over the points to see values!</p>
    </div>
  );
}