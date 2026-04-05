// client/src/App.jsx
import React, { useState } from "react";
import "./App.css";
import SpiderChart from "./SpiderChart.jsx";
import MovieInput from "./MovieInput.jsx";

export default function App() {
  const [text, setText] = useState("");
  
  const sampleData = {
    Action: 0.8,
    Comedy: 0.6,
    Drama: 0.7,
    Horror: 0.3,
    Romance: 0.5,
    "Sci-Fi": 0.9,
  };

  return (
    <div className="app-container">
      <h1>Movie Taste Visualiser</h1>
      <SpiderChart data={sampleData} />
      <p>Hover over the points to see values!</p>
      <h1 style={{ textAlign: "center" }}>Movie Search Dropdown</h1>
      <MovieInput />
      <div className="textbox-container">
        <input
          id="notes"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          className="notes-input"
        />
      </div>
    </div>
  );
}